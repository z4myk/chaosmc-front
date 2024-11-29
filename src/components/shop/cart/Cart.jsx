import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import chaosmclogo from '../../../assets/chaosmclogo.png'
import {Link} from 'react-router-dom';
import { useCartContext } from "../../../context/CartContext";
import { useAuthStore } from "../../../hooks/useAuthStore";
import Swal from 'sweetalert2'
export const Cart = () => {

  const {status} = useAuthStore();
  const {
      cartItems,
      removeFromCart,
      getTotalPrice,
      incrementCart,
      removeProductCompletely,
    } = useCartContext();
    

   

    const serverNameMap = {
        "ChaosMC Gens": "Demonic Gens",
        "Void Gens 1": "Void Gens",
        'ChaosMC Gens 2' : 'Demonic Gens'
      };
    
      const getDisplayName = (server) => {
        return serverNameMap[server] || server;
      };

      const handleRemoveProductCompletely = (id) => {
       
        Swal.fire({
          title: "Estás seguro de eliminar este producto?",
          text: "¡Esta opción no se podra revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "green",
          color: "#ffffff",
          background: "#1a1a1a",
          cancelButtonColor: "#d33",
          confirmButtonText: "Borrar"
        }).then((result) => {
          if (result.isConfirmed) {
            removeProductCompletely(id)
            Swal.fire({
              title: "Producto eliminado!",
              text: "El producto fue eliminado del carrito.",
              color: "#ffffff",
          background: "#1a1a1a",
              icon: "success",
              confirmButtonColor: "green",
            });
          }
        });
      }


  return (
    <>
  
     {status === "authenticated" ? (
          <span></span>
          ) : (
            <div className="alert alert-danger text-center">Debes iniciar sesión para continuar con la compra.</div>
        )}
      <div className="container text-light text-center mt-3">
        <h1>
            Carrito <FontAwesomeIcon icon={faBasketShopping }/> 
        </h1>
        <hr />
        {cartItems.length === 0 ? (
          <div class="alert alert-danger" role="alert">
            El carrito de compras se encuentra vacío 😢 
          </div>
        ) : (
          <>
          <div className="table-responsive">
            <table className="table border table-dark table-hover text-light container">
              <thead className="">
                <tr className="">
                  <th>Eliminar</th>
                  <th></th>
                  <th>Producto</th>
                  <th>Modalidad</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((items) => (
                  <tr className="" key={items.id}>
                    <td className="">
                      {" "}
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveProductCompletely(items.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                    <td>
                     {items.image ? (
                <div className="text-center">
                  <img
                    src={items.image}
                    alt={items.name}
                    className="imageCartProducts rounded"
                  />
                </div>
              ) : (
                <img
                  src={chaosmclogo}
                  alt="ChaosMC Logo"
                  className="imageCartProducts"
                />
              )} 
                    </td>
                <td>{items.name}</td>
                <td>{items.servers.length > 1 
  ? "Chaos MC Global" 
  : getDisplayName(items.servers[0].name)}</td>
                    <td>${items.discountedPrice} USD</td>
                    <td>
                      <button
                        className="btn btn-outline-secondary mx-2 buttonRoundedCart"
                        onClick={() => removeFromCart(items.id)}
                      >
                        <b>-</b>
                      </button>
                      {items.quantity}
                      <button
                        className="btn btn-outline-secondary mx-2 buttonRoundedCart"
                        onClick={() => incrementCart(items.id)}
                      >
                        <b>+</b>
                      </button>
                    </td>
                    <td>${(parseFloat(items?.discountedPrice) * (items?.quantity || 1)).toFixed(2)} USD</td>

                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="mt-5">
              Total del carrito
            </h3>
            
            <div className="table-responsive ">
            <table class="table border table-dark table-hover">
              <thead className="text-light">
               
              </thead>
              <tbody>
                <tr>
                  <th scope="col" className="text-success">${getTotalPrice()} USD</th>
                 
                </tr>
              </tbody>
            </table>
            </div>
            <div className="d-flex justify-content-end">
            {status === "authenticated" ? (
              <Link to="/finalizar-compra" className="text-decoration-none"> 
              <button className="btn btn-success p-3 px-5 mb-5">
                Continuar Compra
              </button>
            </Link>
              ) : (
                <button className="btn btn-success p-3 px-5 disabled mb-5">Continuar Compra</button>
              )}         
             
            </div>
            </div>
          </>
        )}
      </div>

    </>
  );
};