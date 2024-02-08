// ShoppingBasket.jsx

import React from 'react';
import { useApi } from '../../context/ApiContext';
import './ShoppingBasket.css';

const ShoppingBasket = () => {
  const { apiState, addToBasket, removeFromBasket } = useApi();

  return (
    <div className="shopping-basket">
      {apiState.shoppingBasket.map((product) => (
        <div key={product.id} className="basket-item">
          <span className="basket-item-name">{product.name}</span>
          <button className="add-to-basket-btn" onClick={() => addToBasket(product)}>
            +{/* Ekleme işareti */}
          </button>
          <button className="remove-from-basket-btn" onClick={() => removeFromBasket(product.id)}>
            -{/* Çıkarma işareti */}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingBasket;
