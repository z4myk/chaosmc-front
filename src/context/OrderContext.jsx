import React from 'react'
import { createContext, useContext, useState} from "react";
import axios from 'axios'
import productApi from '../api/productsApi';
export const OrderContext = createContext();


export function useOrderContext() {
    return useContext(OrderContext);
}


export const OrderProvider = ({ children }) => {
   
        const [isLoading, setIsLoading] = useState(true);
    
      
      const [msgError, setMsgError] = useState(false);
      const [orders, setOrders] = useState([]);
      const [payments, setPayments] = useState([]);
      const [ordersById, setOrdersById] = useState([]);
  
      const getOrders = async() => {
          try{
              setIsLoading(true)
            const response = await productApi.get('/orders')
            setOrders(response.data)
            setIsLoading(false)
        }catch(error){
            console.log(error)
        }
      }

    const getOrderById = async(id, state) => {
      try{
        setIsLoading(true)
        const response = await productApi.get(`/orders/${id}`)
        state(response.data.msg)
      }catch(error){
        console.log(error)
      }
    }
  

    const getPayments = async() => {
      try{
          setIsLoading(true)
        const response = await productApi.get('/payment')
        setPayments(response.data)
        setIsLoading(false)
    }catch(error){
        console.log(error)
    }
  }
  
    return (
      <OrderContext.Provider
        value={{
            getOrders,
            getOrderById,
            orders,
            getPayments,
            payments,

        }}
      >
        {children}
      </OrderContext.Provider>
    );
  };