import React from 'react'
import { createContext, useContext, useState, useEffect} from "react";
import axios from 'axios'
import productApi from '../api/productsApi';
export const ProductsContext = createContext();


export function useProductsContext() {
    return useContext(ProductsContext);
}


export const ProductsProvider = ({ children }) => {
   
        const [isLoading, setIsLoading] = useState(true);
        const [serversData, setServersData] = useState([]);
        const [serverCategoryData, setServerCategoryData] = useState([]);
        const [productsByCategory, setProductsByCategory] = useState([])
        const [randomProducts, setRandomProducts] = useState([])
      
      const [msgError, setMsgError] = useState(false);

      const [discount, setDiscount] = useState(0); // Estado para guardar el descuento

      const getDiscount = async () => {
        try {
          const response = await productApi.get('/discount'); // Llama a tu endpoint de descuento
          setDiscount(response.data.discountPercentage); // Guarda el descuento en el estado
        } catch (error) {
          console.log("Error obteniendo el descuento:", error);
        }
      };



      useEffect(() => {
        getDiscount(); // Obtén el descuento al montar el contexto
      }, []);
    
  
      const getServers = async() => {
          try{
              setIsLoading(true)
            const response = await productApi.get('/servers')
            setServersData(response.data)
            setIsLoading(false)
        }catch(error){
            console.log(error)
        }
      }


      const getServersCategory = async(server) => {
        try{
            setIsLoading(true)
          const response = await productApi.get(`/products/server/${server}`)
          setServerCategoryData(response.data)
          setIsLoading(false)
      }catch(error){
          console.log(error)
      }
    }

    const getProductsByCategory = async (server, category) => {
      try {
        setIsLoading(true);
    
        // Obtén los productos de la API
        const response = await productApi.get(`/products/server/${encodeURIComponent(server)}/category/${encodeURIComponent(category)}`);
    
        // Aplica el descuento a cada producto
        const discountedProducts = response.data.map(product => {
          const discountedPrice = product.price - (product.price * (discount / 100));
          return {
            ...product,
            discountedPrice: discountedPrice.toFixed(2) 
          };
        });
    
        setProductsByCategory(discountedProducts); 
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
   
    const getRandomProducts = async () => {
      try {
        setIsLoading(true);
        const response = await productApi.get('/products/random');
    
        // Aplica el descuento a cada producto
        const discountedProducts = response.data.map(product => {
          const discountedPrice = product.price - (product.price * (discount / 100));
          return {
            ...product,
            discountedPrice: discountedPrice.toFixed(2) // Redondear a dos decimales si es necesario
          };
        });
    
        setRandomProducts(discountedProducts); // Almacena los productos con el precio descontado
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };


    const getProductById = async (id, state) => {
      try {
        setIsLoading(true);
    
        // Obtén el producto por ID
        const response = await productApi.get(`/products/${id}`);
        const product = response.data;
    
        // Aplica el descuento al precio del producto
        const price = parseFloat(product.price) || 0; // Asegúrate de que el precio sea un número
        const discountedPrice = price - (price * (discount / 100));
    
        // Actualiza el producto con el precio con descuento
        const productWithDiscount = {
          ...product,
          discountedPrice: discountedPrice.toFixed(2) // Redondear a dos decimales si es necesario
        };
    
        state(productWithDiscount);
      } catch (error) {
        console.log("Error obteniendo el producto por ID o aplicando el descuento:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
  

  
    return (
      <ProductsContext.Provider
        value={{
            isLoading,
            getServers,
            serversData,
            getServersCategory,
            serverCategoryData,
            getProductsByCategory,
            productsByCategory,
            getRandomProducts,
            randomProducts,
            getProductById,
            discount,

        }}
      >
        {children}
      </ProductsContext.Provider>
    );
  };