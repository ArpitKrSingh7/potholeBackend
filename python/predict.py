# python/predict.py
import sys
import json
import pandas as pd
import numpy as np
import warnings
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' # Suppress TF warnings
warnings.filterwarnings('ignore')

from tensorflow.keras.models import load_model
import joblib

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

def process_and_predict(json_str):
    try:
        data = json.loads(json_str)
        df = pd.DataFrame(data)
        
        # Load Model and Scaler 
        script_dir = os.path.dirname(os.path.abspath(__file__))
        model = load_model(os.path.join(script_dir, 'pothole_detection_model_lbp.h5'))
        scaler = joblib.load(os.path.join(script_dir, 'scaler.pkl'))

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

        # Apply LBP (FIXED FOR EXACT 50-ROW PACKETS)
        signals = ['accelerometerX', 'accelerometerY', 'accelerometerZ', 'gyroX', 'gyroY', 'gyroZ', 'accel_magnitude']
        for signal_name in signals:
            for bin_idx in range(8):
                df[f'{signal_name}_lbp_bin_{bin_idx}'] = 0.0
                
        for signal_name in signals:
            if signal_name in df.columns:
                signal = df[signal_name].values
                lbp_codes = compute_1d_lbp(signal, radius=1)
                
                # Instead of a sliding window, compute the histogram for the whole 50-frame chunk
                if len(lbp_codes) > 0:
                    hist = create_lbp_histogram(lbp_codes, bins=8, radius=1)
                    # Assign this texture fingerprint to the dataframe
                    for bin_idx, bin_val in enumerate(hist):
                        df[f'{signal_name}_lbp_bin_{bin_idx}'] = bin_val

        df = df.fillna(method='bfill').fillna(method='ffill').fillna(0)

        # Select Columns (Must match training exactly)
        feature_columns = ['accelerometerX', 'accelerometerY', 'accelerometerZ', 'gyroX', 'gyroY', 'gyroZ', 'speed', 'accel_magnitude', 'gyro_magnitude', 'speed_norm_accel', 'impact_score', 'z_gyro_combo']
        lbp_feature_cols = [col for col in df.columns if '_lbp_bin_' in col]
        feature_columns.extend(lbp_feature_cols)

        # Scale and Predict
        X = df[feature_columns].values
        X_scaled = scaler.transform(X)
        
        # Take the sequence
        sequence = np.array([X_scaled[-50:]])
        
        predictions = model.predict(sequence, verbose=0)
        is_pothole = int(np.argmax(predictions, axis=1)[0])
        confidence = float(np.max(predictions, axis=1)[0])

        return {"success": True, "isPothole": is_pothole == 1, "confidence": confidence}

    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    input_data = sys.argv[1]
    result = process_and_predict(input_data)
    print(json.dumps(result))