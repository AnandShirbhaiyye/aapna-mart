import React, { useState, useEffect } from "react";
import "./MyOrders.css";
import Navbar from "../../components/Navbar/Navbar";

function MyOrders() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (storageUser?.email) {
      setUser(storageUser);
    } else {
      alert("You are not logged in!");
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-center">My Orders</h1>
    </>
  );
}

export default MyOrders;
