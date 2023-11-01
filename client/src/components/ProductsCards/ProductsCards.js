import React from "react";
import './ProductsCards.css';

function ProductsCards({ name, price, image, description }) {
  return (
    <>
      <div className="product-card shadow-lg">
        <img src={image} alt={name} className="product-card-image" />
        <h2 className="product-card-name">{name}</h2>
        <p className="product-card-description">{description}</p>
        <p className="product-card-price">₹ {price}</p>

        <button type="button" className="btn btn-dark w-100 mt-3">
          <b>Add to Card</b>
        </button>
      </div>
    </>
  );
}

export default ProductsCards;
