import React, { useEffect, useState } from "react";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        "https://food-tracking-backend.onrender.com/api/orders/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("Orders API response:", data); // 🔥 DEBUG

      // ✅ HANDLE ALL CASES
      if (data?.orders) {
        setOrders(data.orders);
      } else if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>My Orders 📦</h2>

      {/* 🔄 LOADING */}
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={styles.card}>
            <p><b>Order ID:</b> {order.orderId || order._id}</p>
            <p><b>Total:</b> ₹{order.totalAmount}</p>

            {/* 🍕 ITEMS */}
            <div style={{ marginTop: "10px" }}>
              <b>Items:</b>
              {order.items?.map((item, i) => (
                <div key={i} style={styles.item}>
                  {item.name} × {item.quantity} = ₹
                  {item.price * item.quantity}
                </div>
              ))}
            </div>

            {/* STATUS */}
            <p style={{ marginTop: "10px" }}>
              <b>Status:</b>{" "}
              <span style={getStatusStyle(order.status)}>
                {order.status?.toUpperCase()}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

const getStatusStyle = (status) => {
  if (status === "pending")
    return { color: "black", fontWeight: "600" };

  if (status === "processing")
    return { color: "blue", fontWeight: "600" };

  if (status === "Delivered" || status === "delivered")
    return { color: "green", fontWeight: "600" };

  return { color: "gray" };
};

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
    marginBottom: "25px",
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

  item: {
    marginLeft: "10px",
    fontSize: "14px",
    color: "#334155",
  },
};

export default MyOrders;
