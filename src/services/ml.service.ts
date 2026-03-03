import config from "../config/config";

const ML_API_URL = config.mlapiurl;

export const analyzeSensorData = async (
  sensorData: any[],
): Promise<{ isPothole: boolean; confidence: number }> => {
  try {
    const response = await fetch(ML_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sensorData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Python API Error: ${errorData.detail || response.statusText}`,
      );
    }

    const result = await response.json();
    return {
      isPothole: result.isPothole,
      confidence: result.confidence,
    };
  } catch (error) {
    console.error("ML Service communication failed:", error);
    throw error;
  }
};
