import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <h1>Order your favourite food here</h1>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
}

export default Header;