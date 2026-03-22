import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cartCount }) {
  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const role = user?.role?.toLowerCase();

  return (
    <div className="navbar">
      <h2 className="logo">Foodie</h2>

      <div className="nav-right">
        {!user ? (
          <>
            <button onClick={() => navigate("/")}>Home</button>
            <button className="nav-login" onClick={() => navigate("/login")}>
              Login
            </button>
            <button onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        ) : (
          <>
            <span className="username">Hey, {user.name}</span>

            {/* MENU */}
            <button onClick={() => navigate("/menu")}>Menu</button>

            {/* ADMIN */}
            {role === "admin" && (
              <button onClick={() => navigate("/admin/orders")}>
                Orders
              </button>
            )}

            {/* CUSTOMER */}
            {role === "customer" && (
              <>
                <button onClick={() => navigate("/cart")}>
                  Cart ({cartCount || 0})
                </button>

                <button onClick={() => navigate("/my-orders")}>
                  My Orders
                </button>
              </>
            )}

            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;