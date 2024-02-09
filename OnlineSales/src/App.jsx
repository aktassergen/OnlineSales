import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // BrowserRouter'dan Router olarak adını değiştirin
import Header from './components/header/Header';
import ProductList from './components/productList/ProductList';
import './App.css';
import Home from './components/home/Home';
import { ApiProvider } from './context/ApiContext';
import ShoppingBasket from './components/shoppingBacket/ShoppingBacket';

const App = () => {
  return (
    <ApiProvider>
      <Router> 
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/basket" element={<ShoppingBasket  />} /> 
        </Routes>
      </Router>
    </ApiProvider>
  );
};

export default App;
