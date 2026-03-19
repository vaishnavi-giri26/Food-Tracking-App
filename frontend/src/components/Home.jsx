import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.avif";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <img src={bgImage} alt="bg" style={styles.bg} />

      <div style={styles.overlay}>
        <h1 style={styles.title}>Welcome to Foodie</h1>

        <p style={styles.subtitle}>
          Delicious food at your doorstep
        </p>

        <div style={styles.buttons}>
          <button
            style={styles.loginBtn}
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            style={styles.registerBtn}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    height: "100vh",
  },

  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  overlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",

    /* 🔥 DARK OVERLAY FOR VISIBILITY */
    background: "rgba(0,0,0,0.35)",
    padding: "40px",
    borderRadius: "16px",
    backdropFilter: "blur(6px)",
  },

  /* 🔥 BIG BOLD TEXT */
  title: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#dbeafe", // light sky (navbar shade)
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#bfdbfe",
    marginBottom: "25px",
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },

  /* 🔥 MATCH NAVBAR BUTTON STYLE */
  loginBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#93c5fd",
    color: "#1e3a8a",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },

  registerBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#93c5fd",
    color: "#1e3a8a",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Home;