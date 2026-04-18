import * as mealsRepo from "../repositories/mealsRepository.js";

export const getAllMeals = async () => {
  return await mealsRepo.getMeals();
};

export const createMeal = async (data) => {
  return await mealsRepo.addMeal(data);
};