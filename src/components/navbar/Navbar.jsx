import React, {useEffect, useState} from 'react'
import chaosmclogo from '../../assets/chaosmclogo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faCartShopping,
    faBasketShopping,
    faArrowRightToBracket,
    faPlay,
    faUser,
    faTachometerAlt,
    faUserShield,
  } from "@fortawesome/free-solid-svg-icons";
  import {Link, useNavigate} from 'react-router-dom'
import { useAuthStore } from '../../hooks/useAuthStore';
import { useCartContext } from '../../context/CartContext';

export const Navbar = () => {

 

  const { status, user, startLogout } = useAuthStore();

  const {cartItems} = useCartContext();



  

    return (
        <>
      
            <nav class="navbar  navbar-expand-lg navbar-dark navbarBackground text-light p-3">
  <div class="container-fluid">
    {/* <a class="navbar-brand" href="#"><img src={chaosmclogo} className="logoNavbar" /></a> */}
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <Link to="/" className="text-decoration-none">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"><i class="fi fi-tr-house-chimney"></i> Inicio</a>
        </li>
          </Link>

       

      </ul>
      
      <Link className="text-decoration-none mx-2" to="/carrito">
      
      <FontAwesomeIcon icon={faBasketShopping }/> <span className="">({cartItems.length})</span>
      
      </Link>
      <br />

      <Link className="text-decoration-none" to="/tiendas">
      <button class="button">
      <i class="fi fi-rs-marketplace-store"></i> Tienda
      </button>
      </Link>
      {status === 'authenticated' ? ( 
        user.roles.name === 'administrador' ? (
          <Link className="text-decoration-none" to="/admin/dashboard"> 
        <button class="buttonLogin mx-3">
        <FontAwesomeIcon icon={faUserShield} /> ADMIN
        </button>
        </Link>
        ) : 
        <Link className="text-decoration-none" to="/mi-cuenta"> 
        <button class="buttonLogin mx-3">
        <FontAwesomeIcon icon={faUser} /> Mi Cuenta
        </button>
        </Link>
      ): (
        <Link className="text-decoration-none" to="/auth/iniciar-sesion"> 
      <button class="buttonLogin mx-3">
      <FontAwesomeIcon icon={faArrowRightToBracket} /> Login
      </button>
      </Link>
      )}
      
    </div>
  </div>
</nav>

        </>
    )
}
