import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ thumbnail, title, description, price, rating }) => {
  const [quantity, setQuantity] = useState(0);

  const addToCart = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    // Sepete ürünü ekleyen fonksiyon buraya gelecek
  };

  const removeFromCart = () => {
    setQuantity(prevQuantity => prevQuantity > 0 ? prevQuantity - 1 : 0);
    // Sepetten ürünü çıkaran fonksiyon buraya gelecek
  };

  return (
    <div className="product-card">
      <img src={thumbnail} alt={title} />
      <div className="product-info">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>Fiyat: {price}</p> 
        <p>Puan: {rating}</p> 
        {quantity > 0 ? (
          <div className="quantity-buttons">
            <button onClick={removeFromCart}>-</button>
            <span>{quantity}</span>
            <button onClick={addToCart}>+</button>
          </div>
        ) : (
          <button onClick={addToCart}>+</button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
