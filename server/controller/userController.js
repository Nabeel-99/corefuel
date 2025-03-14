import { generateMotivationalQuote, getFoodInfo } from "../api.js";
import Exercise from "../model/exercise.js";
import Food from "../model/food.js";
import User from "../model/user.js";
import Video from "../model/video.js";
import {
  calculateBMR,
  calculateDailyGoals,
  calculateTDEE,
  getCalorieIntake,
} from "./metricsController.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userMetrics = await user.populate("metrics");
    const metrics = userMetrics.metrics;
    return res.status(200).json({ message: "Authenticated", metrics, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting user data" });
  }
};

export const getMotivationalQuote = async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { goal, phase, activityLevel, struggle } = req.body;
  const now = new Date();
  const lastGenerated = user.lastQuoteGeneratedAt;

  const minutesDiff = lastGenerated ? (now - lastGenerated) / (1000 * 60) : 11;

  if (lastGenerated && minutesDiff < 10) {
    return res
      .status(429)
      .json({ message: "Quote already generated in the last 10 minutes" });
  }

  try {
    const result = await generateMotivationalQuote(
      goal,
      phase,
      struggle,
      activityLevel
    );

    user.lastQuoteGeneratedAt = now;
    await user.save();

    return res
      .status(200)
      .json({ message: "Motivational quote generated successfully", result });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error generating motivational quote" });
  }
};

export const createExercise = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { exerciseName, exerciseType, exerciseDuration, caloriesBurned } =
      req.body;

    const exercise = new Exercise({
      userId,
      exerciseName,
      exerciseType,
      exerciseDuration,
      caloriesBurned,
    });

    await exercise.save();
    return res.status(200).json({ message: "Exercise added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding exercise" });
  }
};
export const getUserExercises = async (req, res) => {
  try {
    const userId = req.userId;
    const userExercises = await Exercise.find({ userId });

    if (!userExercises) {
      return res.status(404).json({ message: "User exercises not found" });
    }
    return res.status(200).json({ message: "Authenticated", userExercises });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting user data" });
  }
};
export const deleteExercise = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { exerciseId } = req.body;
    const exercise = await Exercise.findOneAndDelete({ _id: exerciseId });
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    return res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting exercise" });
  }
};

export const searchFood = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { query } = req.body;
    const food = await getFoodInfo(query);
    if (!food || food.length === 0) {
      return res.status(404).json({ message: "Food not found" });
    }
    return res.status(200).json({ message: "Authenticated", food });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting user data" });
  }
};

export const saveFood = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { foodData, foodType } = req.body;
    const calories = foodData.calories ? parseFloat(foodData.calories) : 0;
    const carbs = foodData.carbs
      ? parseFloat(foodData.carbs.replace(/[^\d.-]/g, ""))
      : 0;
    const fats = foodData.fats
      ? parseFloat(foodData.fats.replace(/[^\d.-]/g, ""))
      : 0;
    const sodium = foodData.sodium
      ? parseFloat(foodData.sodium.replace(/[^\d.-]/g, ""))
      : 0;
    const sugar = foodData.sugar
      ? parseFloat(foodData.sugar.replace(/[^\d.-]/g, ""))
      : 0;
    const protein = foodData.protein
      ? parseFloat(foodData.protein.replace(/[^\d.-]/g, ""))
      : 0;

    const newFood = new Food({
      userId,
      foodName: foodData.title,
      foodType: foodType,
      foodCategory: foodData.mealType,
      foodMacros: {
        calories: calories,
        carbs: carbs,
        fats: fats,
        sodium: sodium,
        sugar: sugar,
        protein: protein,
      },
    });
    await newFood.save();
    return res.status(200).json({ message: "Food saved successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error saving food" });
  }
};

export const getUserFood = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userFood = await Food.find({ userId });
    if (!userFood) {
      return res.status(404).json({ message: "User food not found" });
    }
    return res.status(200).json({ message: "Authenticated", userFood });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting user data" });
  }
};

export const getExerciseVideos = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { category } = req.params;

    const exercisevideos = await Video.find({ category });
    if (!exercisevideos) {
      return res.status(404).json({ message: "User food not found" });
    }

    return res.status(200).json({ message: "Authenticated", exercisevideos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting user data" });
  }
};

export const searchExercise = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { title } = req.body;
    const search = await Video.find({ title: title });
    if (!search) {
      return res.status(404).json({ message: "No search results found" });
    }
    return res.status(200).json({ message: "Found exercise", search });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error searching exercise" });
  }
};

export const generateUserCalories = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userWithMetrics = await user.populate("metrics");
    const metrics = userWithMetrics.metrics;

    if (!metrics) {
      return res.status(400).json({ message: "User metrics not found" });
    }

    // Calculate user age from dob
    const dob = new Date(metrics.dob);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();

    const isBirthdayPassed =
      today.getMonth() > dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

    if (!isBirthdayPassed) {
      age--;
    }

    const BMR = calculateBMR(
      metrics.gender,
      metrics.weight,
      metrics.height,
      age
    );
    const TDEE = calculateTDEE(BMR, metrics.activityLevel);
    if (
      !metrics.goals ||
      !Array.isArray(metrics.goals) ||
      metrics.goals.length === 0
    ) {
      return res.status(400).json({ message: "User has no goals set" });
    }

    const calorieTarget = getCalorieIntake(metrics.goals[0], TDEE);
    const dailyGoals = calculateDailyGoals(calorieTarget, metrics.weight);

    return res.status(200).json({
      message: "Calories and goals generated",
      calorieTarget,
      dailyGoals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error generating calories" });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { foodId } = req.body;
    const food = await Food.findOneAndDelete({ _id: foodId });
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    return res.status(200).json({ message: "Food deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting food" });
  }
};
// export const addExerciseNote = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const { exerciseNote } = req.body;

//     return res.status(200).json({ message: "Note added successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Error adding note" });
//   }
// };
