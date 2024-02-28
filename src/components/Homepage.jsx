import React from "react";
import { Link } from "react-router-dom";
import "./styling/Homepage.css";
import categoryImages from "../data/categoryimageConfig";

const Homepage = ({ categories }) => {
  return (
    <div className="homepage">
      <h1>Welcome to Our Catalog</h1>
      <div className="category-grid">
        {categories.map((category) => (
          <Link
            to={`/product-catelog/category/${category}`}
            key={category}
            style={{ textDecoration: "none" }}
          >
            <div className="category-item">
              {categoryImages[category] ? (
                <img
                  src={categoryImages[category]}
                  alt={`Category: ${category}`}
                />
              ) : (
                <img
                  src="/missing-category.jpg"
                  alt="Missing category visual"
                />
              )}
              <h2>{category}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
