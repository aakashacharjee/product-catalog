import React from "react";
import { Link } from "react-router-dom"; // Import for navigation
import "./styling/ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product-catelog/product/${product.id}`}
      className="product-card"
    >
      {" "}
      {/* Navigation Link */}
      <img
        src={require(`../images/${product.images[0]}`)}
        className="product-image"
        alt={product.name}
      />{" "}
      {/* Dynamic Image Path */}
      <div className="product-info">
        <h3>{product.name}</h3>
        <div adiv="price-section">
          {product.discount > 0 && ( //Updated condition - check if discount is greater than 0
            <>
              <span class="original-price">₹{product.price}</span>
              <span class="discounted-price">
                ₹{Math.floor(product.price * (1 - product.discount / 100))}
              </span>
              <span class="discount-badge">{product.discount}% OFF </span>
            </>
          )}
          {!product.discount && ( //Simplified to show only when discount is 0
            <span class="regular-price">₹{product.price}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
