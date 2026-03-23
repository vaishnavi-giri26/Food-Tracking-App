import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import FoodDisplay from "./components/FoodDisplay.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/checkout.jsx";
import Orders from  "./components/orders.jsx"; 
import AdminDashboard from "./components/AdminDashboard.jsx";
import Register from "./components/registration.jsx";
import Login from "./components/login.jsx";
import Home from "./components/Home.jsx"; 
import MyOrders from "./components/MyOrders.jsx";

function App() {
  const [cartItems, setCartItems] = useState([]);

 const token = localStorage.getItem("token");

  let user = null;
  try{
    user =
      JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  // Add to cart
  const addToCart = (item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Remove
  const removeFromCart = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Router>
      <Navbar cartCount={totalCartCount} />

      <Routes>
        <Route path="/" element={<Home />} /> 
<Route
  path="/menu"
  element={
    token ? <FoodDisplay addToCart={addToCart} /> : <Navigate to="/login" />
  }
/>
        <Route
  path="/cart"
  element={
    token ? (
      <Cart
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    ) : (
      <Navigate to="/login" />
    )
  }
/>

<Route
  path="/my-orders"
  element={
    token ? <MyOrders /> : <Navigate to="/login" />
  }
/>

        <Route
          path="/checkout"
          element={
            <Checkout cartItems={cartItems} clearCart={clearCart} />
          }
        />

        {/* Admin Dashboard (role-based) */}
        <Route
          path="/admin/dashboard"
          element={
            token && user?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/*   Admin Orders */}
        <Route
          path="/admin/orders"
          element={
            token && user?.role === "admin" ? (
              <Orders />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/*   Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
