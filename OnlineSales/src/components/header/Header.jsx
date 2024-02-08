import React from 'react';
import './header.css'; // Header bileşeni için CSS dosyasını içe aktar
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul>
        <li><a href="#">Anasayfa</a></li>
          <li><a href="#">Ürünler</a></li>
        </ul>
      </nav>
      <div className="cart">Sepet</div> {/* Sepet bilgisi */}
    </header>
  );
};

export default Header;
