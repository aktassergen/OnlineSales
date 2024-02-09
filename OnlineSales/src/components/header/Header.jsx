import React, { useState } from 'react';
import './header.css'; // Header bileşeni için CSS dosyasını içe aktar
import { Link } from "react-router-dom";
import ShoppingBasket from '../shoppingBacket/ShoppingBacket';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Sepet öğelerini burada tanımlayın veya alın

  const toggleCart = () => {
    setIsCartOpen(prevState => !prevState);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <ul>
          <li><Link to="/">Anasayfa</Link></li>
          <li><Link to="/products">Ürünler</Link></li>
          <li><Link to="/basket">Sepet</Link></li>
        </ul>
      </nav>
      <div className="cart-container" onMouseEnter={toggleCart} onMouseLeave={toggleCart}>
        <span className="cart">Sepet </span> 
        <div className={`cart-dropdown ${isCartOpen ? 'active' : ''}`}>
          <ShoppingBasket isOpen={isCartOpen} cartItems={cartItems} />
        </div>
      </div>
    </header>
  );
};

export default Header;
