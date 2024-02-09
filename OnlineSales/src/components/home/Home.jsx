import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import ProductCard from '../productCard/ProductCard';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [targetIds] = useState([1, 2, 5, 7, 9]);
  const [hovered, setHovered] = useState(false);
  const [cartProducts, setCartProducts] = useState([]); 
  const [popularProducts, setPopularProducts] = useState([]); 
  const [timer, setTimer] = useState(5); // Timer için state ekle

  useEffect(() => {
    const apiUrl = "https://dummyjson.com/products";

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setFeaturedProducts(response.data.products);
        const filteredProducts = response.data.products.filter(product => product.rating > 4.5);
        setPopularProducts(filteredProducts);

        const savedCart = localStorage.getItem('cart');
        if(savedCart){
          setCartProducts(JSON.parse(savedCart));
        }
      
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
        setTimer(prevTimer => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setCurrentIndex(prevIndex => (prevIndex + 1) % targetIds.length); // Timer bittiğinde diğer slayta geç
            return 5; // Timer'ı yeniden başlat
          }
        });
      }, 1000); // 1000ms = 1 saniye
    }
    return () => clearInterval(interval);
  }, [hovered, targetIds]);

  const handleNextProduct = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % targetIds.length);
    setTimer(5); // Yeni slayta geçtiğinde timer'ı sıfırla
  };

  const handlePrevProduct = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + targetIds.length) % targetIds.length);
    setTimer(5); // Yeni slayta geçtiğinde timer'ı sıfırla
  };

  const selectedProduct = featuredProducts.find(product => product.id === targetIds[currentIndex]);

  const addToCart = (product) => {
    const updatedCart = [...cartProducts, product];
    setCartProducts(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    const updatedPopularProducts = popularProducts.map(p => {
      if (p.id === product.id) {
        return { ...p, quantityInCart: (p.quantityInCart || 0) + 1 }; 
      }
      return p;
    });
    setPopularProducts(updatedPopularProducts);
  };
  
  const removeFromCart = (productId) => {
    const indexOfProduct = cartProducts.findIndex(item => item.id === productId);
    if (indexOfProduct !== -1) {
      const updatedCart = [...cartProducts];
      updatedCart.splice(indexOfProduct, 1);
      setCartProducts(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      const updatedPopularProducts = popularProducts.map(p => {
        if (p.id === productId) {
          return { ...p, quantityInCart: (p.quantityInCart || 1) - 1 }; 
        }
        return p;
      });
      setPopularProducts(updatedPopularProducts);
    }
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
                addToCart={() => addToCart(selectedProduct)} 
                removeFromCart={() => removeFromCart(selectedProduct.id)} 
                quantityInCart={cartProducts.filter(item => item.id === selectedProduct.id).length} 
              />
            )}
            {hovered ? null : <div className="timer">{timer}</div>} {/* Timer sadece fare üzerinde değilken görünecek */}
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
              addToCart={() => addToCart(product)} 
              removeFromCart={() => removeFromCart(product.id)} 
              quantityInCart={cartProducts.filter(item => item.id === product.id).length} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
