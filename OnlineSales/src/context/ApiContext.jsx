// ApiContext.jsx

import React, { createContext, useContext, useState } from 'react';

// API'nin başlangıç durumu
const initialApiState = {
  shoppingBasket: [],
  recipes: [], // recipes state'ini ekledik
};

// Context oluşturma
const ApiContext = createContext();

// API sağlayıcısı bileşeni
export const ApiProvider = ({ children }) => {
  const [apiState, setApiState] = useState(initialApiState);

  // Sepete ürün ekleme fonksiyonu
  const addToBasket = (product) => {
    setApiState((prevState) => ({
      ...prevState,
      shoppingBasket: [...prevState.shoppingBasket, product],
    }));
  };

  // Sepetten ürün çıkarma fonksiyonu
  const removeFromBasket = (productId) => {
    setApiState((prevState) => ({
      ...prevState,
      shoppingBasket: prevState.shoppingBasket.filter(
        (product) => product.id !== productId
      ),
    }));
  };

  // recipes state'ini güncelleme fonksiyonu
  const setRecipes = (newRecipes) => {
    setApiState((prevState) => ({
      ...prevState,
      recipes: newRecipes,
    }));
  };

  return (
    <ApiContext.Provider value={{ apiState, addToBasket, removeFromBasket, setRecipes }}>
      {children}
    </ApiContext.Provider>
  );
};

// Özel bir hook oluşturma
export const useApi = () => useContext(ApiContext);
