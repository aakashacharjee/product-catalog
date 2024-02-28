// Navigation.js
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Homepage from "../components/Homepage";
import ProductDetails from "../components/ProductDetails";
import CategoryPage from "../components/CategoryPage";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import Checkout from "../components/Checkout";
import "./Navigation.css";

function Navigation({ categories }) {
  return (
    <div>
      <nav>
        <div className="home-link">
          <Link to="/product-catelog" data-item="Home">
            Home
          </Link>
        </div>

        <ul className="menuItems">
          <li>
            {/* Use Link instead of anchor */}
            <Link to="/product-catelog/cart" data-item="Cart">
              Cart
            </Link>
          </li>
          <li>
            {/* Use Link instead of anchor */}
            <Link to="/product-catelog/wishlist" data-item="Wishlist">
              Wishlist
            </Link>
          </li>
        </ul>
      </nav>

      <Routes basename={process.env.PUBLIC_URL}>
        <Route
          path="/product-catelog"
          element={<Homepage categories={categories} />}
        />
        <Route path="/product-catelog/product/:productId" element={<ProductDetails />} />
        <Route
          path="/product-catelog/category/:categoryName"
          element={<CategoryPage />}
        />
        <Route path="/product-catelog/cart" element={<Cart />} />
        <Route path="/product-catelog/wishlist" element={<Wishlist />} />
        <Route path="/product-catelog/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default Navigation;
