import React, { useState } from "react";
import "./Meals.css";

const initialMeals = [
  { id: 1, name: "Mediterranean Summer Salad", desc: "Fresh garden greens, Kalamata olives, feta...", category: "Main Course", price: 18.50, status: true, img: "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { id: 2, name: "Truffle Mushroom Pizza", desc: "Wild porcini, truffle oil, fresh mozzarella...", category: "Main Course", price: 24.00, status: true, img: "https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { id: 3, name: "Crispy Golden Fries", desc: "Hand-cut potatoes, sea salt, rosemary...", category: "Appetizers", price: 8.00, status: true, img: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { id: 4, name: "Garlic Butter Shrimps", desc: "Sauteed shrimps, lemon, parsley...", category: "Appetizers", price: 14.50, status: true, img: "https://images.pexels.com/photos/5695928/pexels-photo-5695928.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { id: 5, name: "Midnight Cocoa Donuts", desc: "70% Dark chocolate, sea salt...", category: "Desserts", price: 15.00, status: false, img: "https://images.pexels.com/photos/1191639/pexels-photo-1191639.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { id: 6, name: "Precision Flat White", desc: "Double espresso, oat milk...", category: "Beverages", price: 5.50, status: true, img: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=150" }
];

export default function Meals() {
  const [meals, setMeals] = useState(initialMeals);
  const [filter, setFilter] = useState("All Items");
  const [showModal, setShowModal] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: "", desc: "", category: "Main Course", price: "" });

  const toggleStatus = (id) => {
    setMeals(meals.map(m => m.id === id ? { ...m, status: !m.status } : m));
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    const mealToAdd = {
      ...newMeal,
      id: Date.now(),
      status: true,
      price: parseFloat(newMeal.price),
      img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=150"
    };
    setMeals([...meals, mealToAdd]);
    setShowModal(false);
    setNewMeal({ name: "", desc: "", category: "Main Course", price: "" });
  };

  const filteredMeals = filter === "All Items" ? meals : meals.filter(m => m.category === filter);

  return (
    <div className="meals-management">
      <header className="meals-header">
        <div className="header-text">
          <span className="subtitle">CATALOG MANAGEMENT</span>
          <h1>Meals Management</h1>
        </div>
        <button className="add-btn" onClick={() => setShowModal(true)}>+ Add New Meal</button>
      </header>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Meal</h2>
            <form onSubmit={handleAddMeal}>
              <input type="text" placeholder="Meal Name" required value={newMeal.name} onChange={(e) => setNewMeal({...newMeal, name: e.target.value})} />
              <input type="text" placeholder="Description" required value={newMeal.desc} onChange={(e) => setNewMeal({...newMeal, desc: e.target.value})} />
              <input type="number" placeholder="Price" required value={newMeal.price} onChange={(e) => setNewMeal({...newMeal, price: e.target.value})} />
              <select value={newMeal.category} onChange={(e) => setNewMeal({...newMeal, category: e.target.value})}>
                <option>Main Course</option>
                <option>Appetizers</option>
                <option>Desserts</option>
                <option>Beverages</option>
              </select>
              <div className="modal-btns">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="filter-tabs">
        {["All Items", "Main Course", "Appetizers", "Desserts", "Beverages"].map(tab => (
          <button key={tab} className={filter === tab ? "active" : ""} onClick={() => setFilter(tab)}>{tab}</button>
        ))}
      </div>

      <div className="table-wrapper">
        <table className="meals-table">
          <thead>
            <tr><th>MEAL NAME & DESCRIPTION</th><th>CATEGORY</th><th>PRICE</th><th>STATUS</th></tr>
          </thead>
          <tbody>
            {filteredMeals.map((meal) => (
              <tr key={meal.id}>
                <td className="meal-cell">
                  <div className="img-container"><img src={meal.img} alt={meal.name} className="meal-img" /></div>
                  <div><div className="meal-name">{meal.name}</div><div className="meal-desc">{meal.desc}</div></div>
                </td>
                <td><span className="cat-badge">{meal.category.toUpperCase()}</span></td>
                <td className="price-cell">${meal.price.toFixed(2)}</td>
                <td>
                  <label className="switch">
                    <input type="checkbox" checked={meal.status} onChange={() => toggleStatus(meal.id)} />
                    <span className="slider round"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}