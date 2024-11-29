import {React, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useProductsContext} from '../../context/ProductsContext';
export const ShopHome = () => {

    const {getServers, serversData, isLoading} = useProductsContext();
    
    
    useEffect(() => {
        getServers();
    }, [])


    const filteredData = serversData.filter(item => {
        const cleanedItem = item.trim().toLowerCase();
        return cleanedItem !== 'chaosmc discord' && 
               cleanedItem !== 'voide gens 2' && 
               cleanedItem !== 'chaosmc gens 2';
      });

      const serverNameMap = {
        'ChaosMC Gens': 'Demonic Gens',
        'Void Gens 1': 'Void Gens',
        'ChaosMC Gens 2' : 'Demonic Gens'
    };

    const getDisplayName = (server) => {
        return serverNameMap[server] || server;
    };

  
    return (
        <div className="mt-5  mb-5 container">
            <div className=" p-3">
            <h1 className="text-light text-center">ELIJA SU MODALIDAD</h1>
            </div>
            <div>
            <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    
    <li class="breadcrumb-item "><a href="/">Inicio</a></li>
    <li class="breadcrumb-item active"><Link to="/tienda">Tienda</Link></li>
    
  </ol>
  <hr />
</nav>
            </div>

            <div className="d-flex justify-content-around gap-5 flex-wrap mt-5 container">
            {isLoading ? (
          <div class="loader"></div>
        ) : (
          filteredData.map((server) => (
            <Link to={`/tienda/servidor/${server}`} key={server}>
              <div className="border-danger btn btn-dark p-5 cardServers cardsContainer shadow">
                <h3 className="text-light changeTextColor">{getDisplayName(server)}</h3>
              </div>
            </Link>
          ))
        )}
            </div>
        </div>
    )
}
