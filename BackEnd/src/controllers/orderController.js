import {
  createOrder,
  addOrderItem,
  getMenuItem,
  updateOrderTotal,
} from "../repositories/orderRepository.js";

export const createOrderHandler = async (req, res) => {
  try {
    const { table_id, items } = req.body;
    const user_id = req.user.id;

    // 1️⃣ create order
    const orderId = await createOrder(table_id, user_id);

    // 2️⃣ add items
    for (let item of items) {
      const menuItem = await getMenuItem(item.menu_item_id);

      if (!menuItem) {
        return res.status(404).json({ message: "Item not found" });
      }

      await addOrderItem(
        orderId,
        item.menu_item_id,
        item.quantity,
        menuItem.price
      );
    }

    // 3️⃣ calculate total
    await updateOrderTotal(orderId);

    res.json({
      message: "Order created successfully",
      order_id: orderId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};