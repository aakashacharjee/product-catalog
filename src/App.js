import React, { useState, useEffect } from "react";
import "./App.css";
import Navigation from "./data/Navigation"; 
import { CartWishlistProvider } from "./contexts/CartWishlistContext";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (shouldFetch) {
        console.log("Attempting to fetch products.json");
        try {
          const response = await fetch("/product-catalog/products.json");
          console.log("Response status:", response.status);

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setProducts(data);
          const uniqueCategories = [
            ...new Set(data.map((item) => item.category)),
          ];
          setCategories(uniqueCategories);
          setShouldFetch(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [products, shouldFetch]);

  return (
    <CartWishlistProvider>
      <div className="App">
        <Navigation categories={categories} />{" "}
      </div>
    </CartWishlistProvider>
  );
}

export default App;
