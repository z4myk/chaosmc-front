import React from 'react'
import { useCartContext } from '../../context/CartContext';
import chaosmclogo from '../../assets/chaosmclogo.png'
import {Link} from 'react-router-dom'
export const ShopProductsByServerAndCategoryCard = (product) => {


    const {addToCart, cartItems} = useCartContext();

   

    return (
        <div>
             <div key={product.id} className="mb-4 p-4 card cardServers cardServersProducts">
          {product.image ? (
                <img src={product.image} alt={product.name} className="imageProducts rounded" />
            ) : (
                <img src={chaosmclogo} alt="ChaosMC Logo" className="imageProducts" />
            )}
            <div className="mt-3">
        <p className="text-light">{product.name}</p>
        <div className="d-flex justify-content-between">
       <p className="text-light"><span>$</span><del>{product.price} USD</del></p>
       <p className="text-success"><span>$</span>{product.discountedPrice} USD</p>

        </div>
            </div>
            <Link to={`/tienda/producto/${product.id}`} >
        <button className="btn btn-outline-dark text-light border-danger w-50">Ver más </button>
            </Link>
      </div>
        </div>
    )
}
