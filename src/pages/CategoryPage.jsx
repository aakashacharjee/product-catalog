import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterDropdown from "../components/utils/FilterDropdown";
import SortDropdown from "../components/utils/SortDropdown";
import ClearFiltersButton from "../components/utils/ClearFilterButton";
import "../styles/pages/CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]); // Placeholder - you likely fetch this somewhere else in your app structure, so adjust accordingly
  const [selectedCategory, setSelectedCategory] = useState(categoryName);
  const [sortOrder, setSortOrder] = useState("desc"); // Default to descending
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // You might make the same data fetch for all  products as you likely do in `App.js`, and then we will add filtering after this...
      const response = await fetch("/product-catalog/products.json");
      const data = await response.json();
      setProducts(data);
    };
    setSelectedCategory(categoryName);
    fetchData();
  }, [categoryName]);
  // Filtering Logic
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory &&
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "desc") {
      return b.price - a.price; // High to Low
    } else {
      return a.price - b.price; // Low to High
    }
  });

  return (
    <div>
      <h2 className="category-bar">{selectedCategory}</h2>
      <div className="category-page">
        <input
          className="search-input"
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="category-filters">
          <FilterDropdown
            title="Category"
            options={["All", ...new Set(products.map((item) => item.category))]}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />

          <SortDropdown
            title="Sort"
            options={["High to Low", "Low to High"]}
            selected={sortOrder}
            onChange={setSortOrder}
          />
        </div>
        <ClearFiltersButton
          onClear={() => {
            setSelectedCategory("All");
            setSortOrder("desc"); // Adjust to your default sort if needed
          }}
        />

        <div className="product-grid">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
