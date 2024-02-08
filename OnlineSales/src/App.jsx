import React from 'react';
import Header from './components/header/Header';
import ProductList from './components/productList/ProductList';
import './App.css';
import Home from './components/home/Home';

const App = () => {
  return (
    <div>

      <Header />
      <Home />
      {/* <ProductList /> */}
    </div>
  );
};

export default App;
