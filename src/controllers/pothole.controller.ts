import type { Request, Response } from "express";
import { analyzeSensorData } from "../services/ml.service.js";
import { prisma } from "../lib/prisma.js";

export const reportPothole = async (req: Request, res: Response) => {
  try {
    // 1. Grab the data from the mobile app's incoming request
    const { latitude, longitude, sensorData } = req.body;

    // 2. The Bouncer: Did they send enough data?
    // (Your model's sequence_length is 50, so we need at least 50 readings)
    if (!sensorData || sensorData.length < 50) {
      return res.status(400).json({
        success: false,
        message: "Not enough sensor data. Please send at least 50 rows.",
      });
    }

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Missing GPS coordinates.",
      });
    }

    // 3. The Brains: Send the data to your Python ML Microservice
    const prediction = await analyzeSensorData(sensorData);

    // 4. The Vault: If the model says it's a pothole, save it!
    if (prediction.isPothole) {
      const newPothole = await prisma.pothole.create({
        data: {
          latitude: latitude,
          longitude: longitude,
          severity: prediction.confidence, // We save the model's confidence as the severity
        },
      });

      // Send a high-five back to the mobile app
      return res.status(201).json({
        success: true,
        message: "BOOM! Pothole detected and saved to the map!",
        data: newPothole,
      });
    }

    // 5. If it's a flat road, just tell the phone we ignored it
    return res.status(200).json({
      success: true,
      message: "Smooth road detected. Nothing saved.",
      confidence: prediction.confidence,
    });
  } catch (error) {
    console.error(" Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while analyzing data.",
    });
  }
};

export const allPotholes = async (req: Request, res: Response) => {
  try {
    const allPotholes = await prisma.pothole.findMany({
      select: {
        latitude: true,
        longitude: true,
        severity: true,
      },
    });

    return res.status(202).json(allPotholes);
  } catch (e) {
    console.log(e);
    return res.json({ message: "Internal Server Error" });
  }
};
