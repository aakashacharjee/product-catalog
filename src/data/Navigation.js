// Navigation.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../components/Homepage';
import ProductDetails from '../components/ProductDetails';
import CategoryPage from '../components/CategoryPage';
import Cart from '../components/Cart';
import Wishlist from '../components/Wishlist';
import Checkout from '../components/Checkout';
import './Navigation.css';

function Navigation({ categories }) { // Receive categories as a prop
  return (
    
    <div> 
    
      <nav>
        
        <div className="home-link"> 
          <a href="/product-catelog" data-item="Home">Home</a>
        </div>

        
        <ul className="menuItems">
          <li>
            <a href="/cart" data-item="Cart">Cart</a>
          </li>
          <li>
            <a href="/wishlist" data-item="Wishlist">Wishlist</a>
          </li>
        </ul>


      </nav>

      <Routes basename={process.env.PUBLIC_URL}>
        <Route path="/product-catelog" element={<Homepage categories={categories} />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default Navigation;
