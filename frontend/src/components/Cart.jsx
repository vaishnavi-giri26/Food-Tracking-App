import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, addToCart, removeFromCart, clearCart }) => {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.card}>
              <h3 style={styles.title}>{item.name}</h3>
              <p>Price: ₹{item.price}</p>

              <div style={styles.quantityBox}>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={styles.btn}
                >
                  -
                </button>

                <span style={styles.quantity}>{item.quantity}</span>

                <button
                  onClick={() => addToCart(item)}
                  style={styles.btn}
                >
                  +
                </button>
              </div>

              <p style={styles.itemTotal}>
                Total: ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <h3>Total Amount: ₹{totalPrice}</h3>

          <div style={styles.actions}>
            <button onClick={clearCart} style={styles.clearBtn}>
              Clear Cart
            </button>

            <button
              onClick={() => navigate("/checkout")}
              style={styles.checkoutBtn}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  page: {
    padding: "30px",
    fontFamily: "Poppins, sans-serif",
    background: "#f8fafc",
    minHeight: "100vh",
  },
  heading: {
    color: "#1e3a8a",
  },
  card: {
    background: "white",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },
  title: {
    color: "#1e3a8a",
  },
  quantityBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "10px 0",
  },
  btn: {
    padding: "5px 12px",
    background: "#93c5fd",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  quantity: {
    fontWeight: "bold",
  },
  itemTotal: {
    fontWeight: "bold",
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
  },
  clearBtn: {
    padding: "10px",
    background: "#9ca3af",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
  checkoutBtn: {
    padding: "10px",
    background: "#93c5fd",
    color: "#1e3a8a",
    border: "none",
    borderRadius: "6px",
  },
};

export default Cart;