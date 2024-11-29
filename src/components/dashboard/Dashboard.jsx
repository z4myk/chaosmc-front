import React, {useState, useEffect} from 'react'
import { useAuthStore } from '../../hooks/useAuthStore';
import {Link, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesPacking, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useCartContext } from '../../context/CartContext';

export const Dashboard = () => {
    const URL = import.meta.env.VITE_API_URL;
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [productModified, setProductModified] = useState([])
    const { status, user, startLogout } = useAuthStore();
    const {numberDiscount} = useCartContext();
    const navigate = useNavigate();
    const handleLogout = () => {
        startLogout();
        navigate('/')
        window.location.reload();
    };
    
    const handleDiscountChange = (event) => {
      setDiscountPercentage(event.target.value);
    };


   

    const applyDiscount = async () => {
        try {
          const response = await axios.post(`${URL}/discount`, { discountPercentage });
          Swal.fire({
            title: '¡Descuento aplicado!',
            text: `El descuento del ${discountPercentage}% se ha aplicado correctamente.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          console.log('Descuento aplicado:', response.data);
          // Aquí puedes manejar la respuesta, por ejemplo, mostrar un mensaje o actualizar la lista de productos
        } catch (error) {
          console.error('Error aplicando el descuento:', error);
        }
      };

     

    return (
        <>
        <div className="alert alert-success text-center">
        Actualmente hay un {numberDiscount?.discountPercentage || 0}% de descuento disponible!
        </div>
        <section className="container">
        
         <div className="mt-5 mb-5">
            <h1 className="mt-5 text-light text-center">Panel de administración</h1>
            <hr />

        </div>


        <div className="row">
            <div className="col-sm-12 col-md-6 mb-5">
                <Link to="/admin/dashboard/orders">
                    <button className="btn btn-outline-dark w-100 p-3 border-danger mb-3 text-light"> <FontAwesomeIcon icon={faBoxesPacking }/> Ver Pedidos</button>
                </Link>
                <Link to="/admin/dashboard/products">
                <button className="btn btn-outline-dark w-100 p-3 border-danger mb-3 text-light">Productos</button>
                </Link>
        <button className="btn btn-outline-dark w-100 p-3 border-danger mb-3 text-light">Usuarios</button>
        <button className="btn btn-outline-danger w-100" onClick={handleLogout}> <FontAwesomeIcon icon={faRightFromBracket }/> CERRAR SESION</button>
            </div>


            <div className="col-ms-12 col-md-6 mb-5">
                <section>
                    <div className="mx-5 w-50 pb-5">
                    <h3 className="text-light text-center ">Agregar descuento</h3>
                    <select className="form-select bg-dark text-light"  onChange={handleDiscountChange}>
                        <option selected value="0">0%</option>
                        <option value="10">10%</option>
                        <option value="15">15%</option>
                        <option value="20">20%</option>
                        <option value="25">25%</option>
                        <option value="30">30%</option>
                        <option value="35">35%</option>
                        <option value="40">40%</option>
                        <option value="45">45%</option>
                        <option value="50">50%</option>
                        <option value="55">55%</option>
                        <option  value="60">60%</option>
                        <option value="65" >65%</option>
                        <option value="70">70%</option>
                        <option value="75">75%</option>
                        <option value="80">80%</option>
                        <option value="85">85%</option>
                        <option value="90">90%</option>
                    </select>
                    <button className="btn btn-success w-100 mt-2" onClick={applyDiscount}>Agregar</button>
                    </div>
                </section>
            </div>
        </div>
       

        </section>
        </>
    )
}
