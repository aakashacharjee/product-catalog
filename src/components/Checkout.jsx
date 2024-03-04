import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./styling/Checkout.css";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    address: "",
    pin: "",
    city: "",
    state: "",
  });

  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const [hasNavigated, setHasNavigated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submission Triggered");
    console.log("Setting showPopup to true"); // Log state change
    setShowPopup(true); // Show the popup
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const location = useLocation();
  const { cartItems, totalPrice } = location.state || {}; // Extract from location

  useEffect(() => {
    if (!cartItems || !totalPrice) {
      // Handle the case where cart data is missing,
      // e.g., redirect back to the cart
      console.error("Cart data not found! This shouldn't happen.");
      navigate("/product-catalog/cart");
    }
  }, [cartItems, totalPrice, navigate]);

  useEffect(() => {
    // const handleNavigation = () => {
    //     navigate('/');
    //   };
    let didPopupTransition = false;
    console.log("Checkout useEffect started"); // Log on each run
    if (showPopup && !hasNavigated && !didPopupTransition) {
      console.log("useEffect will set timeout and navigate");

      const timer = setTimeout(() => {
        console.log("Navigation executed within timeout");
        navigate("/product-catalog");
        setHasNavigated(true);
      }, 3000);

      return () => {
        console.log("useEffect cleanup function");
        clearTimeout(timer);
      };
    }
  }, [showPopup, navigate, hasNavigated]);

  // The Popup component (make styling adjustments if needed)
  const Popup = () => (
    <div className={`popup ${showPopup ? "visible" : ""}`}>
      <div className="popup-content">
        <h2>Order Successful!</h2>
      </div>
    </div>
  );

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
            <span className="form-content">Name</span>
          </div>
        </div>
        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              id="email"
              name="email"
              pattern="^[^@]+@[^@]+\.[^@]+$"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
            <span className="form-content">Email</span>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              id="mobile-number"
              name="mobile_number"
              pattern="[0-9]{10}"
              value={formData.mobile_number}
              onChange={handleChange}
              required
              className="form-input"
            />
            <span className="form-content">Mobile Number</span>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="form-input"
            />
            <span className="form-content">Address</span>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              id="pin"
              name="pin"
              pattern="[0-9]{6}"
              value={formData.pin}
              onChange={handleChange}
              required
              className="form-input"
            />
            <span className="form-content">Pin Code</span>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="form-input"
            />
            <span className="form-content">City</span>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="form-input"
            />
            <span className="form-content">State</span>
          </div>
        </div>

        <div className="payment-option">
          <label>
            <input
              type="checkbox"
              name="cashOnDelivery"
              value={formData.cashOnDelivery}
              onChange={handleChange}
            />
            Cash on Delivery
          </label>
          <p className="cod-info">We accept cash on delivery only.</p>
        </div>
        {totalPrice && (
          <div className="total-price">Total Price: ₹{totalPrice}</div>
        )}
        <button type="submit">Submit Order</button>
      </form>
      <Popup />
    </div>
  );
};

export default Checkout;
