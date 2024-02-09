import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import ProductCard from '../productCard/ProductCard';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [targetIds] = useState([1, 2, 5, 7, 9]);
  const [hovered, setHovered] = useState(false);
  const [cartProducts, setCartProducts] = useState([]); // Sepetteki ürünleri tutar
  const [popularProducts, setPopularProducts] = useState([]); // Popüler ürünleri tutar
  const [cartQuantities, setCartQuantities] = useState({}); // Sepetteki ürün miktarlarını tutar

  useEffect(() => {
    const apiUrl = "https://dummyjson.com/products";

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setFeaturedProducts(response.data.products);
        const filteredProducts = response.data.products.filter(product => product.rating > 4.5);
        setPopularProducts(filteredProducts);

        const savedCart = localStorage.getItem('cart');
        const cartItems = savedCart ? JSON.parse(savedCart) : [];
        setCartProducts(cartItems); // Sepetteki ürünleri ayarla
        const quantities = {};
        cartItems.forEach(item => {
          quantities[item.id] = item.quantity;
        });
        setCartQuantities(quantities); // Sepetteki ürün miktarlarını ayarla
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

  const addToCart = (product) => {
    const updatedCart = [...cartProducts];
    const existingProductIndex = updatedCart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += 1; // Eğer ürün zaten sepette ise sadece miktarını artır
    } else {
      updatedCart.push({ ...product, quantity: 1 }); // Eğer sepette yoksa yeni ürünü ekle
    }
    const updatedQuantities = { ...cartQuantities };
    updatedQuantities[product.id] = (updatedQuantities[product.id] || 0) + 1;
    setCartQuantities(updatedQuantities);
    setCartProducts(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartProducts.filter(product => product.id !== productId);
    const updatedQuantities = { ...cartQuantities };
    delete updatedQuantities[productId];
    setCartQuantities(updatedQuantities);
    setCartProducts(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="home" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
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
                addToCart={() => addToCart(selectedProduct)} // Popüler ürünü sepete ekle
                removeFromCart={() => removeFromCart(selectedProduct.id)} // Ürünü sepette kaldır
                quantity={cartQuantities[selectedProduct.id] || 0} // Ürünün sepetteki miktarını göster
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
              addToCart={() => addToCart(product)} // Popüler ürünü sepete ekle
              removeFromCart={() => removeFromCart(product.id)} // Ürünü sepette kaldır
              quantity={cartQuantities[product.id] || 0} // Ürünün sepetteki miktarını göster
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
