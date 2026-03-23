import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.avif";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const isFilled = form.email && form.password;

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("https://food-tracking-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      


      if (data.user.role === "admin") {
        window.location.href = "/admin/orders";
      } else {
        window.location.href = "/menu";
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={styles.container}>
      <img src={bgImage} alt="bg" style={styles.bg} />

      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            style={styles.input}
          />

          <button
            style={{
              ...styles.button,
              background: isFilled ? "#93c5fd" : "rgba(255,255,255,0.3)",
              color: isFilled ? "#1e3a8a" : "white",
              cursor: isFilled ? "pointer" : "not-allowed",
            }}
            disabled={!isFilled}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { position: "relative", height: "100vh" },

  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  card: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "320px",
    padding: "35px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
    textAlign: "center",
  },

  title: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "700",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.2)",
    color: "white",
  },

  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
  },
};

export default Login; 
