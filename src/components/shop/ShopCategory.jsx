import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductsContext } from "../../context/ProductsContext";
import { ShopProductsByServerAndCategory } from "./ShopProductsByServerAndCategory";
export const ShopCategory = () => {
  const { server } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {
    getServersCategory,
    serverCategoryData,
    isLoading,
  } = useProductsContext();

  useEffect(() => {
    getServersCategory(server);
  }, [server]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const serverNameMap = {
    "ChaosMC Gens": "Demonic Gens",
    "Void Gens 1": "Void Gens",
  };

  const getDisplayName = (server) => {
    return serverNameMap[server] || server;
  };

  return (
    <>
      <div className="text-light text-center mt-5 mb-5"></div>

      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item ">
              <a href="/">Inicio</a>
            </li>
            <li class="breadcrumb-item">
              <a href="/tienda">Tienda</a>
            </li>
            <li class="breadcrumb-item active">
              <Link to={`/tienda/servidor/${server}`}>
                {getDisplayName(server)}
              </Link>
            </li>
          </ol>
          <hr />
        </nav>
      </div>
      <div className="container text-center row mt-5 flex-wrap mb-5">
        <div className="col-sm-12 col-md-5 mt-3">
          <h3 className="mb-5 text-light cardServers">CATEGORIAS</h3>
  
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            serverCategoryData.map((category) => (
              <div
                key={category}
                className="btn btn-outline-dark text-light cardServers cardsContainer shadow"
                onClick={() => handleCategoryClick(category)}
              >
                <h4>{category}</h4>
              </div>
            ))
          )}
        </div>
        <div className="col-sm-12 col-md-7 mt-3">
          {selectedCategory ? (
            <ShopProductsByServerAndCategory
              server={server}
              category={selectedCategory}
            />
          ) : (
            <div class="alert alert-danger" role="alert">
          Seleccione una categoría para ver los productos
</div>
          )}
        </div>
      </div>
    </>
  );
};
