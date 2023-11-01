import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storageUser);
  }, []);

  return (
    <>
      <div className="navbar shadow p-3 mb-5 bg-body rounded">
        <Link to="/" className="navbar-brand">
          Aapna-Mart🛍️
        </Link>

        <div className="navbar-links-container">
          <Link to="/login" className="navbar-link">
            Login
          </Link>

          <Link to="/signup" className="navbar-link">
            SignUp
          </Link>

          <Link to="/orders" className="navbar-link">
            MyOrders
          </Link>
        </div>

        <div className="navbar-user-container">
          Hello, {user.name || "user"}
          {user?.name ? (
            <span
              className="navbar-logout btn btn-outline-secondary btn-sm"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Logout
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Navbar;
