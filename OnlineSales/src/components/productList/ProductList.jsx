import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios kütüphanesini import et
import ProductCard from '../productCard/ProductCard';
import './productList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiUrl = "https://dummyjson.com/products";

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl); // Axios ile GET isteği yap
        setProducts(response.data.products); // Gelen veriyi state'e kaydet
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard
        key={product.id} 
        title={product.title}
        thumbnail={product.thumbnail}
        description={product.description}
        price={product.price}
        rating={product.rating} />
      ))}
    </div>
  );
};

export default ProductList;
