import React, { useState, useEffect } from "react";
import "./MyOrders.css";
import Navbar from "../../components/Navbar/Navbar";
import showToast from 'crunchy-toast';
import axios from "axios";

const STATUS_BADGE_COLOR_MAP = {
  "pending":"badge-danger",
  "shifted": "badge-warning",
  "delivered": "badge-success"
}

function MyOrders() {
 
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (storageUser?.email) {
      setUser(storageUser);
    } else {
      showToast('You are not logged in!', 'alert', 5000);
      window.location.href = "/login";
    }
  }, []);

  const loadOrders = async ()=>{
    const storageUsers = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = storageUsers._id;
    if(!userId){
    return;
    }

    const response = await axios.get(`/order/user/${userId}`);
    setOrders(response?.data?.data)
  }

  useEffect(()=>{
    loadOrders()
  }, [user])

 

  return (
    <>
      <Navbar />
      <h1 className="text-center">My Orders</h1>
      <div>
        {
          orders?.map((order, index)=>{
            const {product, quantity, status, deliveryCharges} = order;
            return(
              <>
              <div className="order-card shadow-md">
                <h2>{product?.name}</h2>
                <h3>{product?.price} x {quantity} = ₹ {product?.price * quantity}</h3>
                <span className={`order-status ${STATUS_BADGE_COLOR_MAP[status]}`} >{status}</span>
              </div>
              </>
            )
          })
        }
      </div>
    </>
  );
}

export default MyOrders;
