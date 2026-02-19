
import { GoogleGenAI, Type } from "@google/genai";
import { Pregnancy, AntenatalVisit, Patient } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getRiskAssessment = async (patient: Patient, pregnancy: Pregnancy, visits: AntenatalVisit[]) => {
  const latestVisit = visits[visits.length - 1];
  
  const prompt = `
    Analyze the following maternal health data and provide a clinical risk assessment.
    
    Patient: ${patient.full_name}, Age: ${patient.age}, BMI: ${(patient.weight_kg / Math.pow(patient.height_cm/100, 2)).toFixed(1)}
    Pregnancy History: Gravida ${pregnancy.gravida}, Para ${pregnancy.para}, Previous Abortions: ${pregnancy.previous_abortions}
    Current Gestational Age: ${pregnancy.gestational_age_weeks} weeks
    Latest Vital Signs: BP ${latestVisit?.blood_pressure_systolic}/${latestVisit?.blood_pressure_diastolic}, Hb ${latestVisit?.hemoglobin} g/dL, Weight Gain ${latestVisit?.weight - patient.weight_kg} kg
    Complications Noted: ${latestVisit?.complications || 'None'}
    
    Predict the maternal risk score (0-100) and level (Low, Medium, High).
    Identify potential complications and provide 3-5 clinical recommendations.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            risk_score: { type: Type.NUMBER },
            risk_level: { type: Type.STRING },
            predicted_complications: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            recommendations: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          },
          required: ["risk_score", "risk_level", "predicted_complications", "recommendations"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Risk Assessment Error:", error);
    return null;
  }
};
