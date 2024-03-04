import React, { useContext } from "react";
import CartWishlistContext from "./CartWishlistContext";
import CartWishlistItem from "./CartWishlistItem";
import "./styling/CartWishlistItem.css";
import { useNavigate } from "react-router-dom";
import "./styling/CartWishlist.css";

const Cart = () => {
  const { cart, addToCartByQuantity, removeFromCart } =
    useContext(CartWishlistContext);

  const handleQuantityChange = (itemId, adjustment) => {
    const item = cart.find((cartItem) => cartItem.id === itemId);
    if (adjustment === -1 && item.quantity === 1) {
      // Incorrect: 'item' doesn't exist here
      removeFromCart(itemId);
    } else {
      if (item) {
        addToCartByQuantity(item, adjustment);
      }
    }
  };
  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    navigate("/product-catalog/checkout", {
      state: { cartItems: cart, totalPrice: calculateTotalPrice(cart) },
    });
  };

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div>
      <h2>My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items-container">
          {" "}
          {/* Added Container */}
          {cart.map((item) => (
            <CartWishlistItem
              key={item.id}
              item={item}
              onRemove={removeFromCart}
              type="cart"
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
      )}
      {cart.length !== 0 && <p>Total Price: ₹{calculateTotalPrice(cart)}</p>}
      <button className="buy-now-button" onClick={handleBuyNowClick}>
        <div className="button-wrapper">
          <div className="text">Buy Now</div>
          <span className="icon">
            <svg
              viewBox="0 0 16 16"
              className="bi bi-cart2"
              fill="currentColor"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
            </svg>
          </span>
        </div>
      </button>
    </div>
  );
};

export default Cart;
