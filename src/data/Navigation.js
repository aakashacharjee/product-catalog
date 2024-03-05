import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CategoryPage from "../pages/CategoryPage";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import CheckoutPage from "../pages/CheckoutPage";
import "../styles/Navigation.css";

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
          element={<HomePage categories={categories} />}
        />
        <Route
          path="/product-catalog/product/:productId"
          element={<ProductDetailsPage />}
        />
        <Route
          path="/product-catalog/category/:categoryName"
          element={<CategoryPage />}
        />
        <Route path="/product-catalog/cart" element={<CartPage />} />
        <Route path="/product-catalog/wishlist" element={<WishlistPage />} />
        <Route path="/product-catalog/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default Navigation;
