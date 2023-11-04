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
  const [deliveryCharges, setDeliveryCharges] = useState(50);

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
      deliveryCharges: deliveryCharges,
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
      <div className="container buy-page-container shadow-md">
        <div className="row">
          <div className="col-md-4">
            <img
              src={products.image}
              alt={products.name}
              className="buy-product-image shadow-lg"
            />
          </div>
          <div className="col-md-8">
            <h3>{products.name}</h3>
            <p> {products.description}</p>
            <p> {products.price} ₹</p>
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
              <span
                className="btn-descrease-quantity"
                onClick={descreaseQuantiity}
              >
                ➖
              </span>
              <span className="product-quantity-text">{quantity}</span>
              <span
                className="btn-increase-quantity"
                onClick={increaseQuantiity}
              >
                ➕
              </span>
            </div>

            <div className="d-flex mt-3 justify-content-between">
              <div>
                <input
                  type="radio"
                  id="40"
                  name=""
                  className=" me-1"
                  checked={deliveryCharges === 50}
                  onClick={() => {
                    setDeliveryCharges(50);
                  }}
                />
                <label htmlFor="50">
                  {" "}
                  Expected delivery in 3 days in 50 rs
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="100"
                  name=""
                  className=" me-1"
                  checked={deliveryCharges === 100}
                  onClick={() => {
                    setDeliveryCharges(100);
                  }}
                />
                <label htmlFor="100">
                  Expected delivery in 1 day in 100 rs{" "}
                </label>
              </div>
            </div>
          </div>
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
