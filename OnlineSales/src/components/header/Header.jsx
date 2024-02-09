import React from 'react';
import './header.css'; // Header bileşeni için CSS dosyasını içe aktar
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul>
        <li><Link to="/">Anasayfa</Link></li>
          <li><Link to="/products">Ürünler</Link></li>
        </ul>
      </nav>
      <Link to="/basket" className="cart">Sepet</Link> 
    </header>
  );
};

export default Header;
