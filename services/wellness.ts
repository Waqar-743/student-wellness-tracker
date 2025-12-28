import { UserData, WellnessInsight } from "../types";

export const getWellnessInsights = async (data: UserData): Promise<WellnessInsight> => {
  // Local calculation logic to replace Gemini AI

  // Calculate academic load score (0-10)
  const totalCredits = data.subjects.reduce((a, b) => a + b.credits, 0);
  const academicScore = Math.min(10, (totalCredits / 20) * 10);

  // Calculate health score (0-10)
  // Water intake (8 glasses ideal), Junk food (0 ideal), Meals (3 ideal)
  const waterScore = Math.min(10, (data.waterIntake / 8) * 10);
  const foodScore = Math.max(0, 10 - (data.junkFoodPerWeek * 2));
  const healthScore = (waterScore + foodScore) / 2;

  // Calculate time balance score (0-10)
  // Average sleep (8 hours ideal), Study proportion
  const avgSleep = data.timeBalance.reduce((a, b) => a + b.sleep, 0) / Math.max(1, data.timeBalance.length);
  const sleepScore = Math.min(10, (avgSleep / 8) * 10);

  // Final composite stress score (higher means more stress/imbalance)
  // Stress = (Academic Load + (10 - Health) + (10 - Sleep)) / 3
  const finalScore = Math.round(((academicScore + (10 - healthScore) + (10 - sleepScore)) / 3) * 10) / 10;

  let level: 'Low' | 'Medium' | 'High' = 'Low';
  if (finalScore > 7) level = 'High';
  else if (finalScore > 4) level = 'Medium';

  const nextSteps = [];
  if (avgSleep < 7) nextSteps.push("Try to increase your daily sleep to at least 7-8 hours.");
  if (data.waterIntake < 6) nextSteps.push("Drink more water throughout the day (aim for 8 glasses).");
  if (totalCredits > 18) nextSteps.push("Your academic load is heavy; consider breaking study sessions into smaller blocks.");
  if (data.junkFoodPerWeek > 3) nextSteps.push("Reduce junk food consumption to improve energy levels.");
  if (nextSteps.length === 0) nextSteps.push("Keep up the great work maintaining your balance!");

  return {
    score: finalScore,
    level: level,
    recommendation: level === 'High'
      ? "Your current schedule indicates high stress levels. Prioritize rest and hydration."
      : level === 'Medium'
        ? "You have a manageable balance, but there's room for improvement in your health habits."
        : "Excellent balance! You are managing your student life very effectively.",
    analysis: `Based on your data, your average sleep is ${avgSleep.toFixed(1)} hours and your academic load is ${totalCredits} credits. ${level === 'High' ? "The combination of high load and low recovery is risky." : "You are maintaining a decent equilibrium."
      }`,
    nextSteps: nextSteps
  };
};
