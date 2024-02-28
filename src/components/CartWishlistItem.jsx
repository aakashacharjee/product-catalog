import React, { useState } from "react";
import "./styling/CartWishlistItem.css";
import { Link } from "react-router-dom";
import "./styling/ProductDetails.css";

const CartWishlistItem = ({
  item,
  cart,
  onRemove,
  type,
  onQuantityChange,
  onMoveToCart,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(item.quantity);

  const handleQuantityDropdownChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setSelectedQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity - item.quantity); // Call for adjustment
  };

  return (
    <div className="cartwishlist-item">
      <div className="cartwishlist-item-wrapper">
        <img
          src={require(`../images/${item.images[0]}`)}
          className="img-cartwishlistitem"
          alt={item.name}
        />
        <Link to={`/product/${item.id}`}>
          {" "}
          {/* Wrap the name here */}
          <h3>{item.name}</h3>
        </Link>
        {type === "cart" && (
          <div className="quantity-control">
            <select
              value={selectedQuantity}
              onChange={handleQuantityDropdownChange}
            >
              {Array.from({ length: 9 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        <p>Price: ₹{item.price}</p>
      </div>

      <div className="new-button-container">
            <button onClick={() => onRemove(item.id)} className="remove-button">
            <span className="IconContainer">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                height="25"
                width="25"
                >
                <path
                    fill="#CBC8C8"
                    d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z"
                ></path>
                </svg>
            </span>
            <span className="text">
                {type === "cart" ? "Remove from Cart" : "Remove from Wishlist"}
            </span>
            </button>

            {type === "wishlist" && (
            <button onClick={() => onMoveToCart(item, cart)} className="CartBtn">
                <span className="IconContainer">
               
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    fill="rgb(17, 17, 17)"
                    className="cart"
                >
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                </svg>
                </span>
                <p className="text">Move to Cart</p>
            </button>
            )}
      </div>
    </div>
  );
};

export default CartWishlistItem;
