import React, { useEffect, useState } from "react";
import { useProductsContext } from "../../context/ProductsContext";
import chaosmclogo from "../../assets/chaosmclogo.png";
import { useParams, Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import Swal from 'sweetalert2'
export const ShopProductById = () => {
  const { getProductById } = useProductsContext();
  const { addToCart, cartItems } = useCartContext();
  const { id } = useParams();
  const [productById, setProductById] = useState(null);

  useEffect(() => {
    getProductById(id, setProductById);
  }, []);


  const handleAddToCart = () => {
    addToCart(productById)
    Swal.fire({
      text: "¡Producto agregado con éxito!",
      showConfirmButton: false,
      confirmButtonColor: "green",
      background: "#1a1a1a",
      border: "1px solid red",
      color: "#ffffff",
      timer: 1000,
      position: "top-end",
      icon: "success",
    });
  }

  const serverNameMap = {
    "ChaosMC Gens": "Demonic Gens",
    "Void Gens 1": "Void Gens",
    'ChaosMC Gens 2' : 'Demonic Gens'
  };

  const getDisplayName = (server) => {
    return serverNameMap[server] || server;
  };


 

console.log(productById)
  return (
    <div>
 
      <div className=" container">
        <Link to={`/tienda/servidor/${productById?.servers[0]?.name}`}>
      <button className="btn btn-outline-dark text-light  border-danger  mt-2"><i class="fi fi-ts-arrow-left-to-arc"></i> <span className="">Regresar </span></button>
        </Link>
      </div>
      {productById !== null ? (
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-sm-12 col-md-7 text-light text-center">
              <h1 className="mt-2 mb-3">{productById.name}</h1>
              <p className="">
                Precio:
                <br />{" "}
                <span className="text-success">${productById.discountedPrice}USD</span>
              </p>
              <p>
                Servidor: <br /> {productById.servers.length > 1 
  ? "Chaos MC Global" 
  : getDisplayName(productById.servers[0].name)}
              </p>
              <p className="">
                Categoria:
                <br />{" "}
                <span className="text-danger">{productById.category.name}</span>
              </p>
              <p>
                Descripción: <br />
                <span className="small text-secondary">{productById.description}</span>
              </p>
                <div className="mt-3 mb-4">
              <img src={productById.imageUrl} />
                </div>
              <button
                className="btn btn-outline-success w-100"
                onClick={handleAddToCart}
              >
                {" "}
                <i class="fi fi-tr-cart-arrow-down"></i> Agregar al carrito
              </button>
            </div>

            <div className="col-sm-12 col-md-5">
              {productById.image ? (
                <div className="text-center">
                  <img
                    src={productById.image}
                    alt={productById.name}
                    className="imageProducts rounded mt-5"
                  />
                </div>
              ) : (
                <img
                  src={chaosmclogo}
                  alt="ChaosMC Logo"
                  className="imageProducts"
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 pt-5 text-center">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};
