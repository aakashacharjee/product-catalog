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
          <Link to="/ezkart" data-item="Home">
            Home
          </Link>
        </div>

        <ul className="menuItems">
          <li>
            <Link to="/ezkart/cart" data-item="Cart">
              Cart
            </Link>
          </li>
          <li>
            <Link to="/ezkart/wishlist" data-item="Wishlist">
              Wishlist
            </Link>
          </li>
        </ul>
      </nav>

      <Routes basename={process.env.PUBLIC_URL}>
        <Route path="/ezkart" element={<HomePage categories={categories} />} />
        <Route
          path="/ezkart/product/:productId"
          element={<ProductDetailsPage />}
        />
        <Route
          path="/ezkart/category/:categoryName"
          element={<CategoryPage />}
        />
        <Route path="/ezkart/cart" element={<CartPage />} />
        <Route path="/ezkart/wishlist" element={<WishlistPage />} />
        <Route path="/ezkart/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default Navigation;
