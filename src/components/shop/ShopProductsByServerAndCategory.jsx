import React from 'react'
import { useState, useEffect} from 'react'

import {useProductsContext} from '../../context/ProductsContext';
import chaosmclogo from '../../assets/chaosmclogo.png'
import { useCartContext } from '../../context/CartContext';
import { ShopProductsByServerAndCategoryCard } from './ShopProductsByServerAndCategoryCard';

export const ShopProductsByServerAndCategory = ({ server, category }) => {
   
    const {  getProductsByCategory, productsByCategory, isLoading} = useProductsContext();
    const {addToCart, cartItems} = useCartContext();

    const handleAddToCart = (product) => {
      addToCart(product)
    }
    

    useEffect(() => {
        if (server && category) {
            getProductsByCategory(server, category);
        }
    }, [server, category])
    
   


    return (
        <>
        <h3 className="mb-5 text-danger cardServers">{category}</h3>
        <div className="d-flex justify-content-between flex-wrap gap-4">
          
        {isLoading ? (
          <div className="container">
  <div className="loader text-center"></div>
          </div>
) : (
  productsByCategory && productsByCategory.length > 0 ? (
    productsByCategory.map((product) => (
      <div key={product.id}>
        
     <ShopProductsByServerAndCategoryCard {...product} />
      </div>
    ))
  ) : (
    <p>No se encuentran los resultados</p>
  )
)}
 
        </div>
        </>
    )
}
