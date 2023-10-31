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
      <div className="navbar">
        <Link to="/" className="navbar-brand">
          Aapna-Mart🛍️
        </Link>

        <div>
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

        <div>
          Hello, {user.name || "user"}
          {user?.name ? (
            <button
              className="navbar-logout btn btn-outline-secondary btn-sm"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Navbar;
