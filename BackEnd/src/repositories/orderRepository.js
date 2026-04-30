import {db} from "../config/db.js";

export const createOrder = async (table_id, user_id) => {
  const [result] = await db.execute(
    "INSERT INTO orders (table_id, user_id) VALUES (?, ?)",
    [table_id, user_id]
  );
  return result.insertId;
};

export const addOrderItem = async (order_id, menu_item_id, quantity, price) => {
  await db.execute(
    "INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES (?, ?, ?, ?)",
    [order_id, menu_item_id, quantity, price]
  );
};

export const getMenuItem = async (id) => {
  const [rows] = await db.execute(
    "SELECT * FROM menu_items WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const updateOrderTotal = async (order_id) => {
  const [rows] = await db.execute(
    `SELECT SUM(price * quantity) as total FROM order_items WHERE order_id = ?`,
    [order_id]
  );

  const total = rows[0].total || 0;

  await db.execute(
    "UPDATE orders SET total_price = ? WHERE id = ?",
    [total, order_id]
  );
};