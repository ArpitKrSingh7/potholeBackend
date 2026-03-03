# 🕳️ Pothole Detection Backend

A **microservices-based backend** for real-time pothole detection using smartphone sensor data and machine learning. This system powers a **React Native mobile application** that detects potholes while driving and maps them for other users.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Microservices](#microservices)
  - [1. Express API Server (Node.js)](#1-express-api-server-nodejs)
  - [2. ML Prediction Microservice (Python)](#2-ml-prediction-microservice-python)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [How It Works](#how-it-works)
- [Sensor Data Format](#sensor-data-format)
- [ML Model Details](#ml-model-details)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Running in Production](#running-in-production)
- [Deployment](#deployment)
- [License](#license)

---

## Architecture Overview

```
┌──────────────────────┐       ┌──────────────────────────┐       ┌──────────────────────┐
│                      │       │                          │       │                      │
│   React Native App   │──────▶│   Express API Server     │──────▶│  ML Microservice     │
│   (Mobile Client)    │◀──────│   (Node.js / TypeScript) │◀──────│  (Python / FastAPI)  │
│                      │       │                          │       │                      │
└──────────────────────┘       └────────────┬─────────────┘       └──────────────────────┘
                                            │
                                            ▼
                               ┌──────────────────────────┐
                               │                          │
                               │    PostgreSQL Database    │
                               │       (via Prisma)       │
                               │                          │
                               └──────────────────────────┘
```

The system follows a **microservices architecture** with two independently deployable services:

1. **Express API Server** — Acts as the gateway. Receives sensor data from the mobile app, forwards it to the ML service, and persists detected potholes to the database.
2. **Python ML Microservice** — A dedicated FastAPI service that loads a pre-trained Keras deep learning model and performs pothole classification on incoming sensor data.

---

## Microservices

### 1. Express API Server (Node.js)

| Property        | Detail                                             |
| --------------- | -------------------------------------------------- |
| **Language**    | TypeScript                                         |
| **Framework**   | Express v5                                         |
| **Runtime**     | Node.js                                            |
| **ORM**         | Prisma (v7) with `@prisma/adapter-pg` (PostgreSQL) |
| **Package Mgr** | pnpm                                               |
| **Entry Point** | `src/server.ts`                                    |
| **Build**       | `tsc` → `dist/server.js`                           |
| **Backend URL** | _TBD (will be updated after deployment)_           |

**Responsibilities:**

- Receives pothole report requests from the React Native mobile app
- Validates incoming sensor data (minimum 50 readings required) and GPS coordinates
- Proxies sensor data to the Python ML microservice for prediction
- Stores confirmed pothole detections (with GPS coordinates and severity/confidence) in PostgreSQL
- Serves all detected potholes for map rendering on the mobile app

### 2. ML Prediction Microservice (Python)

| Property         | Detail                                                            |
| ---------------- | ----------------------------------------------------------------- |
| **Language**     | Python                                                            |
| **Framework**    | FastAPI                                                           |
| **ASGI Server**  | Uvicorn                                                           |
| **ML Library**   | TensorFlow / Keras                                                |
| **Model File**   | `pothole_detection_model_lbp.h5`                                  |
| **Scaler**       | `scaler.pkl` (scikit-learn StandardScaler, serialized via joblib) |
| **Deployed URL** | https://potholepredictionmodel.onrender.com/predict               |

**Responsibilities:**

- Loads the pre-trained Keras model and scaler into memory on startup (one-time load)
- Accepts raw sensor data arrays via POST request
- Performs feature engineering (magnitude calculation, jerk, rolling stats, LBP texture features)
- Scales features and runs inference through the LSTM/neural network model
- Returns a prediction (`isPothole: boolean`) and confidence score

---

## Tech Stack

| Layer           | Technology                             |
| --------------- | -------------------------------------- |
| Mobile Client   | React Native                           |
| API Gateway     | Express v5 (TypeScript)                |
| ML Service      | FastAPI (Python)                       |
| Database        | PostgreSQL                             |
| ORM             | Prisma v7 (with pg adapter)            |
| ML Framework    | TensorFlow / Keras                     |
| Feature Eng.    | pandas, NumPy, scikit-learn, joblib    |
| Dev Runtime     | tsx (TypeScript execution)             |
| Package Manager | pnpm (Node.js), pip (Python)           |
| Deployment      | Render (ML service), TBD (Express API) |

---

## Database Schema

The project uses **PostgreSQL** managed through **Prisma ORM**.

### `Pothole` Model

| Column      | Type       | Description                                    |
| ----------- | ---------- | ---------------------------------------------- |
| `id`        | `String`   | UUID primary key (auto-generated)              |
| `latitude`  | `Float`    | GPS latitude of the detected pothole           |
| `longitude` | `Float`    | GPS longitude of the detected pothole          |
| `severity`  | `Float?`   | Model's confidence score (0–1), nullable       |
| `createdAt` | `DateTime` | Timestamp of detection (auto-generated)        |
| `updatedAt` | `DateTime` | Last update timestamp (auto-managed by Prisma) |

```prisma
model Pothole {
  id        String   @id @default(uuid())
  latitude  Float
  longitude Float
  severity  Float?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## API Endpoints

### Express API Server

#### `GET /`

Health check endpoint.

**Response:**

```json
{
  "message": "Backend Of Pothole Detection"
}
```

---

#### `POST /api/potholes/report`

Report sensor data for pothole detection. The Express server forwards the sensor data to the Python ML microservice, and if a pothole is detected, it is saved to the database.

**Request Body:**

```json
{
  "latitude": 28.6139,
  "longitude": 77.209,
  "sensorData": [
    {
      "accelerometerX": 0.056,
      "accelerometerY": -0.96,
      "accelerometerZ": 0.212,
      "gyroX": -0.022,
      "gyroY": 0.0,
      "gyroZ": -0.014,
      "speed": 0.0
    }
    // ... at least 50 readings required
  ]
}
```

**Success Response (Pothole Detected — `201`):**

```json
{
  "success": true,
  "message": "BOOM! Pothole detected and saved to the map!",
  "data": {
    "id": "uuid-string",
    "latitude": 28.6139,
    "longitude": 77.209,
    "severity": 0.95,
    "createdAt": "2026-03-04T12:00:00.000Z",
    "updatedAt": "2026-03-04T12:00:00.000Z"
  }
}
```

**Success Response (Smooth Road — `200`):**

```json
{
  "success": true,
  "message": "Smooth road detected. Nothing saved.",
  "confidence": 0.87
}
```

**Error Response (Insufficient Data — `400`):**

```json
{
  "success": false,
  "message": "Not enough sensor data. Please send at least 50 rows."
}
```

**Error Response (Missing GPS — `400`):**

```json
{
  "success": false,
  "message": "Missing GPS coordinates."
}
```

---

#### `GET /api/potholes/report`

Fetch all detected potholes for map rendering.

**Response (`202`):**

```json
[
  {
    "latitude": 28.6139,
    "longitude": 77.209,
    "severity": 0.95
  },
  {
    "latitude": 28.7041,
    "longitude": 77.1025,
    "severity": 0.78
  }
]
```

---

### Python ML Microservice

#### `POST /predict`

**Deployed URL:** `https://potholepredictionmodel.onrender.com/predict`

Accepts a JSON array of sensor readings and returns a pothole prediction.

**Request Body:**

```json
[
  {
    "accelerometerX": 0.056,
    "accelerometerY": -0.96,
    "accelerometerZ": 0.212,
    "gyroX": -0.022,
    "gyroY": 0.0,
    "gyroZ": -0.014,
    "speed": 0.0
  }
  // ... at least 50 readings
]
```

**Response:**

```json
{
  "success": true,
  "isPothole": true,
  "confidence": 0.95
}
```

---

## How It Works

```
Mobile App                    Express Server                 Python ML Service
    │                              │                              │
    │  1. Collects sensor data     │                              │
    │     (accelerometer, gyro,    │                              │
    │      speed) + GPS coords     │                              │
    │                              │                              │
    │  2. POST /api/potholes/report│                              │
    │  ──────────────────────────▶ │                              │
    │                              │  3. Validates data            │
    │                              │     (≥50 rows + GPS)          │
    │                              │                              │
    │                              │  4. POST /predict             │
    │                              │  ───────────────────────────▶ │
    │                              │                              │
    │                              │                 5. Feature Engineering:
    │                              │                    - Accel/Gyro magnitudes
    │                              │                    - Jerk calculations
    │                              │                    - Rolling statistics
    │                              │                    - 1D LBP texture features
    │                              │                    - Scaling (StandardScaler)
    │                              │                              │
    │                              │                 6. Model Inference
    │                              │                    (Keras LSTM)
    │                              │                              │
    │                              │  7. { isPothole, confidence } │
    │                              │  ◀─────────────────────────── │
    │                              │                              │
    │                              │  8. If pothole → save to DB   │
    │                              │     (PostgreSQL via Prisma)   │
    │                              │                              │
    │  9. Response with result     │                              │
    │  ◀────────────────────────── │                              │
    │                              │                              │
```

1. The **React Native mobile app** collects real-time sensor data (accelerometer X/Y/Z, gyroscope X/Y/Z, speed) along with GPS coordinates while the user is driving.
2. Once a batch of at least **50 sensor readings** is collected, the app sends a `POST` request to the Express API server.
3. The Express server **validates** the incoming data (checks for minimum 50 rows and presence of GPS coordinates).
4. The Express server **forwards the raw sensor data** to the Python ML microservice via HTTP POST.
5. The Python service performs **feature engineering** on the raw sensor data:
   - Computes acceleration and gyroscope **magnitudes**
   - Calculates **jerk** (rate of change) for both sensors
   - Computes **rolling standard deviation** (window=50)
   - Derives **speed-normalized acceleration**, **impact score**, and **Z-gyro combo** features
   - Applies **1D Local Binary Pattern (LBP)** texture analysis on each sensor signal and creates histogram features
6. The engineered features are **scaled** using a pre-fitted StandardScaler and fed into the **Keras deep learning model** as a sequence of 50 timesteps.
7. The model returns a **classification** (pothole / smooth road) and a **confidence score**.
8. Back in Express, if a pothole is detected, it is **persisted to PostgreSQL** with the GPS coordinates and the confidence score as severity.
9. The result is returned to the mobile app, which can then **display the pothole on a map**.

---

## Sensor Data Format

Each sensor reading in the `sensorData` array must contain the following fields:

| Field            | Type    | Description                                  |
| ---------------- | ------- | -------------------------------------------- |
| `accelerometerX` | `float` | Acceleration along X-axis (m/s²)             |
| `accelerometerY` | `float` | Acceleration along Y-axis (m/s²)             |
| `accelerometerZ` | `float` | Acceleration along Z-axis (m/s²)             |
| `gyroX`          | `float` | Gyroscope rotation rate along X-axis (rad/s) |
| `gyroY`          | `float` | Gyroscope rotation rate along Y-axis (rad/s) |
| `gyroZ`          | `float` | Gyroscope rotation rate along Z-axis (rad/s) |
| `speed`          | `float` | Device speed (m/s)                           |

A minimum of **50 readings** is required per request (matching the model's sequence length).

---

## ML Model Details

| Property            | Value                                        |
| ------------------- | -------------------------------------------- |
| **Model Type**      | Deep Learning (Keras `.h5`)                  |
| **Architecture**    | Sequential (LSTM-based)                      |
| **Input Shape**     | `(50, N_features)` — 50 timesteps            |
| **Classification**  | Binary (Pothole vs Smooth Road)              |
| **Output**          | Softmax probabilities → argmax for class     |
| **Feature Scaling** | StandardScaler (pre-fitted, saved as `.pkl`) |
| **Feature Eng.**    | Magnitudes, Jerk, Rolling Stats, 1D LBP      |
| **Inference Mode**  | CPU-only (`CUDA_VISIBLE_DEVICES=-1`)         |
| **Model File**      | `python/pothole_detection_model_lbp.h5`      |
| **Scaler File**     | `python/scaler.pkl`                          |

### Engineered Features (68 total)

| Category               | Features                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| **Raw Sensors**        | `accelerometerX`, `accelerometerY`, `accelerometerZ`, `gyroX`, `gyroY`, `gyroZ`, `speed` |
| **Magnitudes**         | `accel_magnitude`, `gyro_magnitude`                                                      |
| **Derived**            | `speed_norm_accel`, `impact_score`, `z_gyro_combo`                                       |
| **Rolling Statistics** | `accel_rolling_std`, `gyro_rolling_std`                                                  |
| **1D LBP Histograms**  | 7 signals × 8 bins = 56 LBP features                                                     |

---

## Project Structure

```
potholeBackend/
├── package.json                  # Node.js dependencies & scripts
├── pnpm-lock.yaml                # pnpm lockfile
├── pnpm-workspace.yaml           # pnpm workspace config
├── tsconfig.json                 # TypeScript configuration
├── prisma.config.ts              # Prisma configuration
├── prisma/
│   ├── schema.prisma             # Database schema definition
│   └── migrations/               # SQL migration files
│       └── 20260303120237_init/
│           └── migration.sql     # Initial migration (Pothole table)
├── python/                       # ML Microservice (independently deployable)
│   ├── server.py                 # FastAPI application & /predict endpoint
│   ├── predict.py                # Standalone prediction script (CLI usage)
│   ├── requirements.txt          # Python dependencies
│   ├── pothole_detection_model_lbp.h5  # Pre-trained Keras model
│   └── scaler.pkl                # Pre-fitted StandardScaler
├── src/                          # Express API Server source code
│   ├── server.ts                 # Entry point — starts the Express server
│   ├── app.ts                    # Express app setup, middleware & routes
│   ├── check.ts                  # Test script with sample sensor data
│   ├── config/
│   │   └── config.ts             # Environment variable configuration
│   ├── controllers/
│   │   └── pothole.controller.ts # Request handlers (report + fetch potholes)
│   ├── services/
│   │   └── ml.service.ts         # HTTP client for Python ML microservice
│   ├── lib/
│   │   └── prisma.ts             # Prisma client initialization
│   ├── routes/
│   │   └── pothole.route.ts      # Route definitions (currently in app.ts)
│   ├── middlewares/               # Express middlewares (extensible)
│   ├── models/                    # Data models (extensible)
│   └── generated/
│       └── prisma/               # Auto-generated Prisma client code
│           ├── client.ts
│           ├── models.ts
│           └── ...
└── dist/                         # Compiled JavaScript output (after build)
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Server
PORT=3000
NODE_ENV=development

# Database (PostgreSQL connection string)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# ML Microservice URL
ML_API_URL=https://potholepredictionmodel.onrender.com/predict
```

| Variable       | Description                                | Default       |
| -------------- | ------------------------------------------ | ------------- |
| `PORT`         | Port for the Express server                | `3000`        |
| `NODE_ENV`     | Environment (`development` / `production`) | `development` |
| `DATABASE_URL` | PostgreSQL connection string               | —             |
| `ML_API_URL`   | URL of the Python ML prediction endpoint   | —             |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **pnpm** >= 10.x
- **Python** >= 3.10
- **PostgreSQL** (running instance with a database created)

### Installation

#### 1. Clone the repository

```bash
git clone <repository-url>
cd potholeBackend
```

#### 2. Install Node.js dependencies

```bash
pnpm install
```

This will automatically run `prisma generate` (via the `postinstall` script) to generate the Prisma client.

#### 3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your database credentials and ML API URL
```

#### 4. Run database migrations

```bash
pnpm exec prisma migrate deploy
```

#### 5. (Optional) Set up the Python ML service locally

```bash
cd python
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Running Locally

#### Start the Express API server (development mode with hot-reload)

```bash
pnpm run dev
# or with file watching:
pnpm run watch
```

The server will start on `http://localhost:3000`.

#### Start the Python ML service locally (optional — can use deployed URL instead)

```bash
cd python
source venv/bin/activate
uvicorn server:app --port 8000 --reload
```

The ML service will be available at `http://localhost:8000/predict`.

> **Note:** If running the ML service locally, set `ML_API_URL=http://localhost:8000/predict` in your `.env` file.

### Running in Production

#### Build the TypeScript project

```bash
pnpm run build
```

#### Start the production server

```bash
pnpm run start
```

This runs the compiled `dist/server.js`.

---

## Deployment

| Service             | Platform | URL                                                 |
| ------------------- | -------- | --------------------------------------------------- |
| **ML Microservice** | Render   | https://potholepredictionmodel.onrender.com/predict |
| **Express API**     | TBD      | _Will be updated after deployment_                  |
| **Database**        | TBD      | PostgreSQL (cloud-hosted)                           |

---

## Scripts

| Script        | Command          | Description                                  |
| ------------- | ---------------- | -------------------------------------------- |
| `dev`         | `pnpm run dev`   | Start dev server with tsx                    |
| `watch`       | `pnpm run watch` | Start dev server with file watching          |
| `build`       | `pnpm run build` | Compile TypeScript to JavaScript             |
| `start`       | `pnpm run start` | Run the compiled production server           |
| `check`       | `pnpm run check` | Type-check without emitting files            |
| `postinstall` | _(automatic)_    | Generates Prisma client after `pnpm install` |

---

## License

ISC
