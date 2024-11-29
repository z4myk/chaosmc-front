import React from 'react'
import { createContext, useContext, useState} from "react";
import {useProductStore} from '../hooks/useProductStore';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
export const CartContext = createContext();



export function useCartContext() {
    return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const {products} = useProductStore();
  const [inputSearch, setInputSearch] = useState("");
    const [search, setSearch] = useState("");
    const [searchProduct, setSearchProduct] = useState([]);
    const [msgError, setMsgError] = useState(false);
    const [numberDiscount, setNumberDiscount] = useState([])
    const URL = import.meta.env.VITE_API_URL;

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : null // Devuelve null si la cantidad es 1 para eliminarlo del carrito
          : item
      ).filter((item) => item !== null) // Filtra y elimina los elementos con cantidad 1
    );
  };

  const handleQuantityChange = (productId, value) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + value } : item
      )
    );
  };

  const getTotalPrice = () => {
    const total = cartItems.reduce((total, item) => total + item.discountedPrice * item.quantity, 0);
    return total.toFixed(2);
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const incrementCart = (productId) => {
    setCartItems((prevItems) =>
    prevItems.map((item) =>
      item.id === productId
        ? item.quantity > 1 || item.quantity === 1
          ? { ...item, quantity: item.quantity + 1 }
          : null // Devuelve null si la cantidad es 1 para eliminarlo del carrito
        : item))


  }


  const removeProductCompletely = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const getSearchProduct = () => {
    setMsgError(false)
    const filterData = products.filter((product) => product.name.toLowerCase().includes(inputSearch.toLowerCase())).reverse();
    setSearch(inputSearch)
    setInputSearch("")
    if (inputSearch.trim() === "" ){ 
        setMsgError(true)
    } else {
        setMsgError(false)
        setSearchProduct(filterData);
    }
  
  };


  const getDiscount = async () => {
    try {
      const response = await axios.get(`${URL}/discount`);
      setNumberDiscount(response.data)
      
    
    } catch (error) {
      console.error('Error aplicando el descuento:', error);
    }
  };

 


  return (
    <CartContext.Provider
      value={{
        cartItems,
        inputSearch,
        setInputSearch,
        search,
        setSearch,
        searchProduct,
        msgError,
        setMsgError,
        setSearchProduct,
        getSearchProduct,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalPrice,
        getTotalQuantity,
        handleQuantityChange,
        incrementCart,
        removeProductCompletely,
        getDiscount,
        numberDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};