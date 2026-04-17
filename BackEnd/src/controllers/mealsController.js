import * as mealsService from "../services/mealsService.js";

export const getMeals = async (req, res) => {
  try {
    const meals = await mealsService.getAllMeals();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching meals" });
  }
};

export const addMeal = async (req, res) => {
  try {
    const meal = await mealsService.createMeal(req.body);
    res.json({ message: "Meal added", meal });
  } catch (err) {
    res.status(500).json({ message: "Error adding meal" });
  }
};