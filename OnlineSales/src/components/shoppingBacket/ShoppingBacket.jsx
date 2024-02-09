import React, { useState, useEffect } from 'react';

const ShoppingBasket = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // localStorage'dan sepet verisini al ve cartItems durumunu güncelle
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  return (
    <div className="shopping-basket">
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} />
            <div className="item-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Fiyat: {item.price}</p>
              <p>Puan: {item.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingBasket;
