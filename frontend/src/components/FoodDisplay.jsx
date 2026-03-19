import React from "react";
import "./FoodDisplay.css";
import bgImage from "../assets/menu.png";

// Food Data
const food_list = [
  { id: 1, name: "Pizza", price: 200 },
  { id: 2, name: "Burger", price: 120 },
  { id: 3, name: "Pasta", price: 180 },
  { id: 4, name: "Sandwich", price: 90 },
  { id: 5, name: "Noodles", price: 150 },
  { id: 6, name: "Ice Cream", price: 80 },
];

function FoodDisplay({ addToCart }) {
  return (
    <div className="food-page">
      
      <img src={bgImage} alt="bg" className="food-bg" />

      <div className="food-display">
        <h2 className="menu-heading">Top Dishes Near You</h2>

        <div className="food-list">
          {food_list.map((item) => (
            <div
              key={item.id}
              className="food-item"
              onClick={() => addToCart(item)}
            >
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodDisplay;