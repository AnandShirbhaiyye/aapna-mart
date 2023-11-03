import React from "react";
import './ProductsCards.css';
import { Link } from "react-router-dom";

function ProductsCards({id, name, price, image, description }) {
  return (
    <>
      <div className="product-card shadow-lg">
        <img src={image} alt={name} className="product-card-image" />
        <h2 className="product-card-name">{name}</h2>
        <p className="product-card-description">{description}</p>
        <p className="product-card-price">₹ {price}</p>

        <Link to={`/buy/${id}`}type="button" className="btn btn-dark w-100 mt-3">
          <b>Add to Card</b>
        </Link>
      </div>
    </>
  );
}

export default ProductsCards;
