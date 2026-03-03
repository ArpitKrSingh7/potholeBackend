# python/server.py
import os
import warnings
os.environ['CUDA_VISIBLE_DEVICES'] = '-1' # Force CPU for fast inference
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
warnings.filterwarnings('ignore')

from fastapi import FastAPI, HTTPException
from typing import List, Dict, Any
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
import joblib

# 1. Initialize the FastAPI app
app = FastAPI(title="Pothole ML Microservice")

# 2. Load the model and scaler GLOBALLY (This happens only once on startup)
print("Loading model into memory...")
script_dir = os.path.dirname(os.path.abspath(__file__))
model = load_model(os.path.join(script_dir, 'pothole_detection_model_lbp.h5'))
scaler = joblib.load(os.path.join(script_dir, 'scaler.pkl'))
print("Model loaded successfully. Ready for rapid inference!")

# Helper functions
def compute_1d_lbp(signal, radius=1):
    lbp_codes = []
    for i in range(radius, len(signal) - radius):
        center = signal[i]
        binary_pattern = 0
        for j in range(1, radius + 1):
            if signal[i - j] >= center:
                binary_pattern |= (1 << (j - 1))
            if signal[i + j] >= center:
                binary_pattern |= (1 << (j - 1 + radius))
        lbp_codes.append(binary_pattern)
    return np.array(lbp_codes)

def create_lbp_histogram(lbp_codes, bins=8, radius=1):
    hist, _ = np.histogram(lbp_codes, bins=bins, range=(0, 2**(2*radius)))
    hist = hist.astype(np.float32)
    hist = hist / (np.sum(hist) + 1e-7)
    return hist

# 3. Create the API Endpoint
@app.post("/predict")
async def predict(payload: List[Dict[str, Any]]):
    try:
        # payload is the raw JSON array sent from Express
        df = pd.DataFrame(payload)
        
        # Feature Engineering 
        df['accel_magnitude'] = np.sqrt(df['accelerometerX']**2 + df['accelerometerY']**2 + df['accelerometerZ']**2)
        df['gyro_magnitude'] = np.sqrt(df['gyroX']**2 + df['gyroY']**2 + df['gyroZ']**2)
        
        df['accel_jerk_magnitude'] = df['accel_magnitude'].diff()
        df['gyro_jerk_magnitude'] = df['gyro_magnitude'].diff()
        
        window = 50
        df['accel_rolling_std'] = df['accel_magnitude'].rolling(window, min_periods=1).std()
        df['gyro_rolling_std'] = df['gyro_magnitude'].rolling(window, min_periods=1).std()
        
        df['speed_norm_accel'] = df['accel_magnitude'] / (df['speed'] + 0.1)
        df['impact_score'] = df['accel_magnitude'] * df['gyro_magnitude']
        df['z_gyro_combo'] = np.abs(df['accelerometerZ']) * df['gyro_magnitude']

        # Apply LBP 
        signals = ['accelerometerX', 'accelerometerY', 'accelerometerZ', 'gyroX', 'gyroY', 'gyroZ', 'accel_magnitude']
        for signal_name in signals:
            for bin_idx in range(8):
                df[f'{signal_name}_lbp_bin_{bin_idx}'] = 0.0
                
        for signal_name in signals:
            if signal_name in df.columns:
                signal = df[signal_name].values
                lbp_codes = compute_1d_lbp(signal, radius=1)
                
                if len(lbp_codes) > 0:
                    hist = create_lbp_histogram(lbp_codes, bins=8, radius=1)
                    for bin_idx, bin_val in enumerate(hist):
                        df[f'{signal_name}_lbp_bin_{bin_idx}'] = bin_val

        df = df.fillna(method='bfill').fillna(method='ffill').fillna(0)

        feature_columns = ['accelerometerX', 'accelerometerY', 'accelerometerZ', 'gyroX', 'gyroY', 'gyroZ', 'speed', 'accel_magnitude', 'gyro_magnitude', 'speed_norm_accel', 'impact_score', 'z_gyro_combo']
        lbp_feature_cols = [col for col in df.columns if '_lbp_bin_' in col]
        feature_columns.extend(lbp_feature_cols)

        # Scale and Predict
        X = df[feature_columns].values
        X_scaled = scaler.transform(X)
        sequence = np.array([X_scaled[-50:]])
        
        predictions = model.predict(sequence, verbose=0)
        is_pothole = int(np.argmax(predictions, axis=1)[0])
        confidence = float(np.max(predictions, axis=1)[0])

        return {"success": True, "isPothole": bool(is_pothole == 1), "confidence": confidence}

    except Exception as e:
        # Send a clean 400 error back to Express if the math fails
        raise HTTPException(status_code=400, detail=str(e))