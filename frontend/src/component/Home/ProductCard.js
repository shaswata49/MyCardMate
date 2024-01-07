// ProductCard.js

import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css"; // Make sure to import your CSS file

const ProductCard = ({ product }) => {
  return (
    <Link className="card" to={`/product/${product._id}`}>
      <div className="imgBox">
        <div className="imageFrame">
          <img className="productImage" src={product.images} alt={product.name} />
        </div>
      </div>
      <div className="contentBox">
        <h3 className="productName">{product.name}</h3>
        <span className="price">{`₹${product.price}`}</span>
        <div className="profit">
          <span className="profitLabel">Profit:</span>
          <span className="profitValue">₹{product.profit}</span>
          <span className="profitEmoji" role="img" aria-label="money-bag">
            💰
          </span>
        </div>
        <div className="descriptionUnit">
          <p className="description">{product.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
