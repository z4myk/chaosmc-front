import React from 'react'
import chaosmclogo from '../../assets/chaosmclogo.png'
import {Link} from 'react-router-dom'
export const Product = ({name, price, image, server, category, id}) => {
   
    return (
        <div  className="mb-4 p-4  cardServers text-center" key={id}>
                {image ? (
                      <img src={image} alt={name} className="w-25 rounded  " />
                  ) : (
                      <img src={chaosmclogo} alt="ChaosMC Logo" className="w-25" />
                  )}
                  <div className="mt-3">
              <p className="text-light">{name}</p>
             <p className="text-success"><span>$</span>{price} USD</p>
             <p>{server}</p>
                  </div>
                 <Link to={`/tienda/producto/${id}`}>
              <button className="btn btn-outline-dark text-light border-danger w-50">Ver Más </button>
                  </Link>
            </div>
    )
}
