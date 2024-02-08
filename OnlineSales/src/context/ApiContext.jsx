// ApiContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [shoppingBasket, setShoppingBasket] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/shoppingBasket');
      setShoppingBasket(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addToBasket = async (product) => {
    try {
      const response = await axios.post('http://localhost:3001/shoppingBasket', product);
      setShoppingBasket([...shoppingBasket, response.data]);
    } catch (error) {
      console.error('Error adding to basket:', error);
    }
  };

  const removeFromBasket = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/shoppingBasket/${productId}`);
      setShoppingBasket(shoppingBasket.filter((item) => item.id !== productId));
    } catch (error) {
      console.error('Error removing from basket:', error);
    }
  };

  return (
    <ApiContext.Provider value={{ shoppingBasket, addToBasket, removeFromBasket }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
