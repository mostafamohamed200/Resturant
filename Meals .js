import React, { useState } from "react";
import "./Meals.css";

function Meals() {
  const [added, setAdded] = useState(null);

  const meals = [
    { id: 1, name: "Beef Burger", price: 25, img: "/images/burger.jpeg" },
    { id: 2, name: "Pizza", price: 30, img: "/images/pizza.jpeg" },
    { id: 3, name: "Pasta", price: 20, img: "/images/pasta 3.jpeg" },
    { id: 4, name: "Sandwich", price: 35, img: "/images/sandwich .jpeg" },
    { id: 5, name: "Proust", price: 40, img: "/images/proust.jpeg" },
    { id: 6, name: "Shish Tawouk", price: 10, img: "/images/shish tawouk.jpeg" }
  ];

  const handleAdd = (id) => {
    setAdded(id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div className="container">
      <h1>Meals</h1>

      <div className="meals">
        {meals.map((meal) => (
          <div className="card" key={meal.id}>
            <img src={meal.img} alt={meal.name} />
            <h3>{meal.name}</h3>
            <p>${meal.price}</p>

            <button
              onClick={() => handleAdd(meal.id)}
              style={{
                background:
                  added === meal.id ? "green" : undefined
              }}
            >
              {added === meal.id ? "Added ✔" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meals;