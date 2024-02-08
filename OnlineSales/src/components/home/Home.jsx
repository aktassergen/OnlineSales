import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import ProductCard from '../productCard/ProductCard';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [targetIds] = useState([1, 2, 5, 7, 9]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [hovered, setHovered] = useState(false); // hovered durumu eklendi

  useEffect(() => {
    const apiUrl = "https://dummyjson.com/products";

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setFeaturedProducts(response.data.products);
        const filteredProducts = response.data.products.filter(product => product.rating > 4.5);
        setPopularProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let interval;
    if (!hovered) {
      interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % targetIds.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [hovered, targetIds]);

  const handleNextProduct = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % targetIds.length);
  };

  const handlePrevProduct = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + targetIds.length) % targetIds.length);
  };

  const selectedProduct = featuredProducts.find(product => product.id === targetIds[currentIndex]);

  return (
    <div className="home" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}> {/* hovered durumu tanımlandı */}
      <div className="featured-products">
        <h2>Öne Çıkan Ürünler</h2>
        <div className="product-box">
          <button className="prev-button" onClick={handlePrevProduct}>{'<'}</button>
          <div className="sliding-product">
            {selectedProduct && (
              <ProductCard
                key={selectedProduct.id}
                thumbnail={selectedProduct.thumbnail}
                title={selectedProduct.name}
                description={selectedProduct.description}
                price={selectedProduct.price}
                rating={selectedProduct.rating}
              />
            )}
          </div>
          <button className="next-button" onClick={handleNextProduct}>{'>'}</button>
        </div>
      </div>
      <div className="popular-products">
        <h2>Popüler Ürünler</h2>
        <div className="product-list">
          {popularProducts.map(product => (
            <ProductCard
              key={product.id}
              thumbnail={product.thumbnail}
              title={product.name}
              description={product.description}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
