import React, { useState, useEffect } from "react";
import "./MyOrders.css";
import Navbar from "../../components/Navbar/Navbar";
import showToast from 'crunchy-toast';

function MyOrders() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (storageUser?.email) {
      setUser(storageUser);
    } else {
      showToast('You are not logged in!', 'alert', 5000);
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
