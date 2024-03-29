import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';


const CategoryList = ({ products }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extract unique categories
    const uniqueCategories = [...new Set(products.map(item => item.category))];
    setCategories(uniqueCategories); 
  }, [products]); 

  return (
    <div className="category-list">
      {categories.map((category) => (
        <div key={category} className="category"> 
          <h2>{category}</h2>

          <div className="product-grid"> 
    {products.filter(product => product.category === category) 
        .map(product => {
            console.log('Filtering for:', category, 'Products:', products.filter(product => product.category === category)); 
            return ( 
                <ProductCard key={product.id} product={product} />
            ); 
        })
    } 
</div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
