import React from 'react';
import'./Meals.css';
function Meals() {
  // دي قائمة بالوجبات (داتا)، تقدري تزودي أي وجبة هنا بسهولة
const mealsData = [
  { 
    id: 1, 
    name: "Beef Burger", 
    price: 25, 
    img: "/images/burger.jpeg" 
  },
  { 
    id: 2, 
    name: "Pizza", 
    price: 30, 
    img: "/images/pizza.jpeg" 
  },
  { 
    id: 3, 
    name: "Proust", 
    price: 35, 
    img: "/images/proust.jpeg" 
  },
  { 
    id: 4, 
    name: "Shish Tawouk", 
    price: 40, 
    img: "/images/shish tawouk.jpeg" 
  }
];

  return (
    <div>
      <h1 className="meals-title">Our Best Meals</h1>
      <div className="meals">
        {mealsData.map((meal) => (
          <div className="card" key={meal.id}>
            <img src={meal.img} alt={meal.name} />
            <h3>{meal.name}</h3>
            <p>${meal.price}</p>
            <button onClick={() => alert(`${meal.name} added!`)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meals;