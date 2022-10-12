import React from "react";
import "../styles/ProductCard.css";

export const ProductCard = ({ image, name, price, description }) => {
  return (
    <>
      <div className="card">
        <img src={image} alt="bottle-img" />
        <div className="bottle-info">
          <h2>{name}</h2>
          <p>{description}</p>
          <p>
            Price : <span className="price-text">$ {price}</span>
          </p>
        </div>
      </div>
    </>
  );
};