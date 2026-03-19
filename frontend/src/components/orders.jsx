import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success) {
      setOrders(data.orders);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Admin Orders Dashboard</h2>

      {orders.map((order) => (
        <div key={order._id} style={styles.card}>
          <p><b>Order ID:</b> {order.orderId}</p>
          <p><b>Customer:</b> {order.userId?.name || "User"}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>

          <div>
            <b>Items:</b>
            {order.items.map((item, i) => (
              <div key={i}>
                {item.name} × {item.quantity} = ₹{item.price * item.quantity}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "10px" }}>
            <b>Status:</b>{" "}
            <select style={styles.dropdown}>
              <option>Pending</option>
              <option>Processing</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(to bottom, #e0f2fe, #f0f9ff)",
  },

  heading: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: "20px",
  },

  card: {
    marginBottom: "20px",
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.25)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    color: "#1e3a8a",
  },

  dropdown: {
    padding: "6px 10px",
    borderRadius: "8px",
    border: "none",
    background: "#bfdbfe",
    color: "#1e3a8a",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Orders;