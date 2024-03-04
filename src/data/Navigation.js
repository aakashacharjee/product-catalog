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
          <Link to="/product-catalog" data-item="Home">
            Home
          </Link>
        </div>

        <ul className="menuItems">
          <li>
            <Link to="/product-catalog/cart" data-item="Cart">
              Cart
            </Link>
          </li>
          <li>
            <Link to="/product-catalog/wishlist" data-item="Wishlist">
              Wishlist
            </Link>
          </li>
        </ul>
      </nav>

      <Routes basename={process.env.PUBLIC_URL}>
        <Route
          path="/product-catalog"
          element={<Homepage categories={categories} />}
        />
        <Route
          path="/product-catalog/product/:productId"
          element={<ProductDetails />}
        />
        <Route
          path="/product-catalog/category/:categoryName"
          element={<CategoryPage />}
        />
        <Route path="/product-catalog/cart" element={<Cart />} />
        <Route path="/product-catalog/wishlist" element={<Wishlist />} />
        <Route path="/product-catalog/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default Navigation;
