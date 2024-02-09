import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../productCard/ProductCard';
import './productList.css';

const ProductList = ({ addToCart, removeFromCart }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const apiUrl = "https://dummyjson.com/products";

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Sayfa yenilendiğinde, localStorage'den sepet verisini al ve cart durumunu ayarla
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Sepete ürün eklendiğinde, quantityInCart durumunu güncelle
    const updatedProducts = products.map(p => {
      if (p.id === product.id) {
        return { ...p, quantityInCart: (p.quantityInCart || 0) + 1 }; // Eğer quantityInCart değeri yoksa 0 olarak kabul et
      }
      return p;
    });
    setProducts(updatedProducts);
  };

  const handleRemoveFromCart = (product) => {
    const updatedCart = cart.filter(item => item.id !== product.id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Sepetten ürün çıkarıldığında, quantityInCart durumunu güncelle
    const updatedProducts = products.map(p => {
      if (p.id === product.id) {
        return { ...p, quantityInCart: (p.quantityInCart || 1) - 1 }; // Eğer quantityInCart değeri yoksa 1 olarak kabul et
      }
      return p;
    });
    setProducts(updatedProducts);
  };

  const findQuantityInCart = (productId) => {
    return cart.filter(product => product.id === productId).length;
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard
          key={product.id}
          title={product.title}
          thumbnail={product.thumbnail}
          description={product.description}
          price={product.price}
          rating={product.rating}
          quantityInCart={findQuantityInCart(product.id)}
          addToCart={() => handleAddToCart(product)}
          removeFromCart={() => handleRemoveFromCart(product)} // handleRemoveFromCart fonksiyonunu iletiyoruz
        />
      ))}
    </div>
  );
};

export default ProductList;
