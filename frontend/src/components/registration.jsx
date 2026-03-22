import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.avif";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const navigate = useNavigate();
  const isFilled = form.name && form.email && form.password;

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://food-tracking-backend.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <img src={bgImage} alt="bg" style={styles.bg} />

      <div style={styles.card}>
        <h2 style={styles.title}>Create Account ✨</h2>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={styles.input}
          />

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

          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
            style={styles.input}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          <button
            style={{
              ...styles.button,
              background: isFilled ? "#93c5fd" : "rgba(255,255,255,0.3)",
              color: isFilled ? "#1e3a8a" : "white",
              cursor: isFilled ? "pointer" : "not-allowed",
            }}
            disabled={!isFilled}
          >
            Register
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
  title: { marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "rgba(255,255,255,0.2)",
    color: "white",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "500",
  },
};

export default Register;
