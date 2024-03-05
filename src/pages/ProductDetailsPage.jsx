import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CartWishlistContext from "../contexts/CartWishlistContext";
import "../styles/pages/ProductDetailsPage.css";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToCart, addToWishlist } = useContext(CartWishlistContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/product-catalog/products.json"); // Fetch your JSON file
        const data = await response.json();

        const foundProduct = data.find(
          (product) => product.id === parseInt(productId)
        );
        setProduct(foundProduct);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/product-catalog/cart");
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    navigate("/product-catalog/wishlist");
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {product && (
        <div className="product-details-container">
          <div className="product-info">
            <h1>{product.name}</h1>
            <img
              src={require(`../images/${product.images[0]}`)}
              className="product-image"
              alt={product.name}
            />
            <p className="product-category">Category: {product.category}</p>
            <div adiv="price-section">
              {product.discount > 0 && ( //Updated condition - check if discount is greater than 0
                <>
                  <span class="original-price">₹{product.price}</span>
                  <span class="discounted-price">
                    ₹{Math.floor(product.price * (1 - product.discount / 100))}
                  </span>
                  <span class="discount-badge">{product.discount}% OFF </span>
                </>
              )}
              {!product.discount && ( //Simplified to show only when discount is 0
                <span class="regular-price">₹{product.price}</span>
              )}
            </div>
            <p>{product.description}</p>
            <h3>Specifications</h3>
            <table>
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="button-container">
        <button onClick={handleAddToCart} className="CartBtn">
          <span className="IconContainer">
             
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
              fill="rgb(17, 17, 17)"
              className="cart"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
            </svg>
          </span>
          <p className="text">Add to Cart</p>
        </button>
        <button onClick={handleAddToWishlist} className="WishlistBtn">
          <span className="IconContainer">
             
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              fill="rgb(17, 17, 17)"
            >
              <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
            </svg>
          </span>
          <p className="text">Add to Wishlist</p>
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
