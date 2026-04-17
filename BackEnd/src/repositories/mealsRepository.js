import {db} from "../config/db.js";

export const getMeals = async () => {
  const [rows] = await db.execute(
    `SELECT m.*, c.name AS category 
     FROM menu_items m
     JOIN categories c ON m.category_id = c.id`
  );

  return rows;
};

export const addMeal = async ({ name, description, price, category_id }) => {
  const [result] = await db.execute(
    `INSERT INTO menu_items (name, description, price, category_id)
     VALUES (?, ?, ?, ?)`,
    [name, description, price, category_id]
  );

  return { id: result.insertId, name, description, price, category_id };
};