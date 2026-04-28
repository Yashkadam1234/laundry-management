import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      {/* LEFT SIDE LINKS */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3 style={{ marginRight: "20px" }}>Laundry CRM</h3>

        <a onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
          Dashboard
        </a>

        <a onClick={() => navigate("/create-order")} style={{ cursor: "pointer" }}>
          Create Order
        </a>

        <a onClick={() => navigate("/orders")} style={{ cursor: "pointer" }}>
          Orders
        </a>
      </div>

      {/* RIGHT SIDE LOGOUT */}
      <button
        onClick={logout}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;