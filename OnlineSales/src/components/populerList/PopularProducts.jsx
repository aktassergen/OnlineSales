import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../productCard/ProductCard';
import './popularProduct.css';

const PopularProducts = () => {
  const [popularProduct, setPopularProducts] = useState([]);

  useEffect(() => {
    const apiUrl = "https://dummyjson.com/products";

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const filteredProducts = response.data.products.filter(product => product.rating > 4.5);
        setPopularProducts(filteredProducts.slice(0, 5)); // İlk 5 popüler ürünü alır
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="popular-products">
      <h2>Popüler Ürünler</h2>
      <div className="product-list">
        {popularProduct.map(product => (
          <ProductCard
            key={product.id}
            thumbnail={product.thumbnail}
            name={product.name}
            description={product.description}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
