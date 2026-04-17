import type { Request, Response } from "express";
import { analyzeSensorData } from "../services/ml.service.js";
import { prisma } from "../lib/prisma.js";

// Haversine formula to calculate distance between two lat/lon coordinates in meters
function getDistanceInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371e3; // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const reportPothole = async (req: Request, res: Response) => {
  try {
    // 1. Grab the data from the mobile app's incoming request
    const { latitude, longitude, sensorData, isValidDrivingSession } = req.body;

    if (isValidDrivingSession === false) {
      return res.status(200).json({
        success: true,
        message: "Ignored stationary/invalid data.",
        confidence: 0,
      });
    }

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
      // 4a. Optimization: Check if there's already a pothole within 5 meters
      const latTolerance = 0.00005; // Approx 5.5 meters
      const lonTolerance = 0.00005;

      const nearbyPotholes = await prisma.pothole.findMany({
        where: {
          latitude: {
            gte: latitude - latTolerance,
            lte: latitude + latTolerance,
          },
          longitude: {
            gte: longitude - lonTolerance,
            lte: longitude + lonTolerance,
          },
        },
      });

      let existingPothole = null;
      for (const p of nearbyPotholes) {
        const dist = getDistanceInMeters(
          latitude,
          longitude,
          p.latitude,
          p.longitude,
        );
        if (dist <= 5.0) {
          existingPothole = p;
          break; // Found one within 5m
        }
      }

      if (existingPothole) {
        // 4b. Update existing pothole by accumulating severity
        const updatedPothole = await prisma.pothole.update({
          where: { id: existingPothole.id },
          data: {
            severity: (existingPothole.severity || 0) + prediction.confidence,
          },
        });

        return res.status(200).json({
          success: true,
          message:
            "BOOM! Nearby pothole detected. Increased severity instead of creating new! 💣",
          data: updatedPothole,
        });
      }

      // 4c. Create new pothole if none exists within 5m
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
