import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  //  Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  //  Fetch Orders
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://food-tracking-backend.onrender.com/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Mark Delivered
  const markDelivered = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`https://food-tracking-backend.onrender.com/orders/${id}/deliver`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchOrders(); // refresh
  };

  //  Delete Order
  const deleteOrder = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`https://food-tracking-backend.onrender.com/orders/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchOrders(); // refresh
  };

  //  Stats
  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status !== "Delivered"
  ).length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  return (
    <div style={{ padding: "20px", background: "#f5f5f5", minHeight: "100vh" }}>
      <h2>📊 Admin Dashboard</h2>

      {/*  Stats */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
        <Card title="Total Orders" value={totalOrders} color="#007bff" />
        <Card title="Delivered" value={deliveredOrders} color="#28a745" />
        <Card title="Pending" value={pendingOrders} color="#ffc107" />
        <Card title="Revenue" value={`₹${totalRevenue}`} color="#6f42c1" />
      </div>

      {/*  Orders Table */}
      <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
        <h3>📦 Orders List</h3>

        <table style={{ width: "100%", marginTop: "15px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#ddd" }}>
              <th style={th}>Order ID</th>
              <th style={th}>Items</th>
              <th style={th}>Amount</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td style={td}>{order.orderId}</td>

                <td style={td}>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.name} x {item.quantity}
                    </div>
                  ))}
                </td>

                <td style={td}>₹{order.totalAmount}</td>

                <td style={td}>
                  <span
                    style={{
                      color:
                        order.status === "Delivered" ? "green" : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status}
                  </span>
                </td>

                <td style={td}>
                  {order.status !== "Delivered" && (
                    <button
                      onClick={() => markDelivered(order._id)}
                      style={deliverBtn}
                    >
                      Deliver
                    </button>
                  )}

                  <button
                    onClick={() => deleteOrder(order._id)}
                    style={deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

//  Card
const Card = ({ title, value, color }) => (
  <div
    style={{
      background: color,
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      minWidth: "200px",
      textAlign: "center",
    }}
  >
    <h3>{title}</h3>
    <p style={{ fontSize: "22px", fontWeight: "bold" }}>{value}</p>
  </div>
);

//  Styles
const th = { padding: "10px", border: "1px solid #ccc" };
const td = { padding: "10px", border: "1px solid #ccc" };

const deliverBtn = {
  marginRight: "10px",
  padding: "5px 10px",
  background: "green",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const deleteBtn = {
  padding: "5px 10px",
  background: "red",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default AdminDashboard;
