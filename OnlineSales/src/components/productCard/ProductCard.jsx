// ProductCard.jsx

import React, { useState, useEffect } from 'react';
import './ProductCard.css';

const ProductCard = ({ thumbnail, title, description, price, rating, addToCart, removeFromCart }) => {
  const [quantityInCart, setQuantityInCart] = useState(0);

  useEffect(() => {
    // Her bileşen yenilendiğinde LocalStorage'dan miktarı al
    const savedQuantity = localStorage.getItem(title);
    if (savedQuantity) {
      setQuantityInCart(parseInt(savedQuantity));
    }
  }, [title]); // Başlık değiştiğinde çalışacak

  const handleAddToCart = () => {
    const newQuantity = quantityInCart + 1;
    setQuantityInCart(newQuantity);
    addToCart({ thumbnail, title, description, price, rating }); // addToCart fonksiyonunu doğru şekilde çağır
    // LocalStorage'a miktarı kaydet
    localStorage.setItem(title, newQuantity.toString());
  };

  const handleRemoveFromCart = () => {
    const newQuantity = Math.max(quantityInCart - 1, 0);
    setQuantityInCart(newQuantity);
    removeFromCart({ title });
    // LocalStorage'a miktarı kaydet
    localStorage.setItem(title, newQuantity.toString());
  };

  return (
    <div className="product-card">
      <img src={thumbnail} alt={title} />
      <div className="product-info">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>Fiyat: {price}</p> 
        <p>Puan: {rating}</p> 
        {quantityInCart > 0 ? (
          <div className="quantity-buttons">
            <button onClick={handleRemoveFromCart}>-</button>
            <span>{quantityInCart}</span>
            <button onClick={handleAddToCart}>+</button>
          </div>
        ) : (
          <button onClick={handleAddToCart}>Sepete Ekle</button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
