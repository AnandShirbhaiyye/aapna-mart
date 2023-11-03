import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./BuyPage.css";

function BuyPage() {
  const { id } = useParams();
  const [products, setProducts] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState("");

  const loadProduct = async () => {
    if (!id) {
      return;
    }

    const response = await axios.get(`/product/${id}`);
    setProducts(response?.data?.data);
  };

  const increaseQuantiity = () => {
    setQuantity(quantity + 1);
  };

  const descreaseQuantiity = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const placeOrder = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    const orderDetails = {
      user: currentUser._id,
      products: id,
      quantity: quantity,
      shippingAddress: shippingAddress,
    };

    const response = await axios.post("/order", orderDetails);
    alert(response?.data?.message);
    if (response?.data?.success) {
      window.location.href = "/orders";
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <>
      <Navbar />
      <div className="buy-page-container shadow-lg">
        <h1>{products.name}</h1>
        <h1> {products.description}</h1>
        <h1> {products.price}</h1>
        <input
          type="text"
          placeholder="enter shipping address"
          className="input-shipping-address"
          value={shippingAddress}
          onChange={(e) => {
            setShippingAddress(e.target.value);
          }}
        />
        <div className="mt-3">
          <span className="btn-descrease-quantity" onClick={descreaseQuantiity}>
            ➖
          </span>
          <span className="product-quantity-text">{quantity}</span>
          <span className="btn-increase-quantity" onClick={increaseQuantiity}>
            ➕
          </span>
        </div>

        <button
          type="button"
          className="btn w-100 mt-3 btn-dark"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>
    </>
  );
}

export default BuyPage;
