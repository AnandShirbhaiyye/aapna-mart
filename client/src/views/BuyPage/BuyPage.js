import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./BuyPage.css";

function BuyPage() {
  const { id } = useParams();
  const [products, setProducts] = useState({});
  const [quantity, setQuantity] = useState(1);

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
        <div>
          <span className="btn-descrease-quantity" onClick={descreaseQuantiity}>
            ➖
          </span>
          <span className="product-quantity-text">{quantity}</span>
          <span className="btn-increase-quantity" onClick={increaseQuantiity}>
            ➕
          </span>
        </div>
      </div>
    </>
  );
}

export default BuyPage;
