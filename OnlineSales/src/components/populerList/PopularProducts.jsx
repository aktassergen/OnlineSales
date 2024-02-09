// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductCard from '../productCard/ProductCard';
// import './popularProduct.css';

// const PopularProducts = () => {
//   const [popularProducts, setPopularProducts] = useState([]);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const apiUrl = "https://dummyjson.com/products";

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(apiUrl);
//         const filteredProducts = response.data.products.filter(product => product.rating > 4.5);
//         setPopularProducts(filteredProducts.slice(0, 5)); // İlk 5 popüler ürünü alır
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();


//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//   }, []);

//   const addToCart = (productId) => {
//     const updatedCart = [...cart];
//     const existingProductIndex = updatedCart.findIndex(item => item.id === productId);

//     if (existingProductIndex !== -1) {

//       updatedCart[existingProductIndex].quantityInCart += 1;
//     } else {

//       updatedCart.push({ id: productId, quantityInCart: 1 });
//     }

//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const removeFromCart = (productId) => {
//     const updatedCart = [...cart];
//     const existingProductIndex = updatedCart.findIndex(item => item.id === productId);

//     if (existingProductIndex !== -1) {

//       updatedCart[existingProductIndex].quantityInCart -= 1;


//       if (updatedCart[existingProductIndex].quantityInCart === 0) {
//         updatedCart.splice(existingProductIndex, 1);
//       }
//     }

//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   return (
//     <div className="popular-products">
//       <h2>Popüler Ürünler</h2>
//       <div className="product-list">
//         {popularProducts.map(product => (
//           <ProductCard
//             key={product.id}
//             thumbnail={product.thumbnail}
//             title={product.name}
//             description={product.description}
//             price={product.price}
//             rating={product.rating}
//             quantityInCart={cart.find(item => item.id === product.id)?.quantityInCart || 0} // Sepetteki ürün sayısını kontrol et
//             addToCart={() => addToCart(product.id)}
//             removeFromCart={() => removeFromCart(product.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularProducts;
