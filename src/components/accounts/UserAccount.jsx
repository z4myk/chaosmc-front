import { faBagShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect} from 'react'
import { useAuthStore } from '../../hooks/useAuthStore';
import {useNavigate} from 'react-router-dom'
import {useOrderContext } from '../../context/OrderContext';
import { UserOrderItem } from './UserOrderItem';

export const UserAccount = () => {

    const { status, checkAuthToken, user, startLogout } = useAuthStore();
    const navigate = useNavigate();

    const {getOrders, orders} = useOrderContext();
   

    useEffect(() => {
      getOrders();
        if (status === 'not-authenticated') {
          navigate('/');
        }
      }, [status, navigate]);

    const handleLogout = () => {
        startLogout();
        navigate('/')
        window.location.reload();
      };

      const filterOrders = orders.filter((order) => order.email === user.email)
    
    return (
        <>
        <section className="container">

        <div className=" mt-3">
        <div className="alert alert-warning">
          <h5 className="card-title">Bienvenido/a, 👋 </h5>
          <p className="card-text">Correo electrónico: {user.email}</p>
          <p className="card-text">Cuenta creada: {user?.createdAt?.slice(0,10)}</p>
          <button className="btn btn-danger" onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket }/> CERRAR SESIÓN
          </button>
          </div>
          </div>
           
            
        

       
            <div className="text-center text-light container">
                <h2> <FontAwesomeIcon icon={faBagShopping} /> MIS COMPRAS</h2>
                <hr />
                <div>
                  {filterOrders ? filterOrders.map((order) => (
                    <UserOrderItem order={order} />
                  )).reverse() : (
                    <p>No has realizado ninguna compra.</p>
                  )}
                </div>
            </div>
           
      
        </section>
        </>
    )
}
