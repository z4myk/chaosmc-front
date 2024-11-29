import { faCheck, faExclamationCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useOrderContext } from '../../context/OrderContext'
import { Pagination } from '../home/Pagination'
import { useCounter } from '../../hooks/useCounter';
import { AdminOrderDatabaseItem } from './AdminOrderDatabaseItem'

export const AdminOrderDatabase = () => {
    const { orders, getOrders, payments, getPayments } = useOrderContext();
    const { counter, decrement, increment, reset } = useCounter(1);

    const maxOrders = 10;
    const lastPage = Math.ceil(orders?.length / maxOrders);

    const [orderSearch, setOrderSearch] = useState('');
    const [elementSearch, setElementSearch] = useState([]);

    
    useEffect(() => {
        getOrders();
        getPayments();
    }, []); //


    useEffect(() => {
        if (orderSearch.trim() === '') {
            setElementSearch(orders);
        } else {
            getSearchData();
        }
    }, [orders, orderSearch]);

    const getSearchData = () => {
        const filterData = orders.filter((order) =>
            order.email.toLowerCase().includes(orderSearch.toLowerCase())
        ).reverse();

        setElementSearch(filterData);
    };

    const ordersConfirmed = orders.filter((order) => order?.status === "Confirmado");
    const ordersInConfirmation = orders.filter((order) => order?.status === "En Proceso de Confirmación");
    const ordersWithoutInformed = orders.filter((order) => order.status === "Sin Informar");

    return (
        <>
            <section className="text-center">
                <h2 className="text-light mt-5 mb-4">Pedidos de compra</h2>
                <hr className="text-warning container mb-4" />

                <div className="d-flex justify-content-between container flex-wrap mb-5 mt-5">
                    <div className="cardsContainerOrders shadow">
                        <h6><FontAwesomeIcon icon={faExclamationCircle} /> Sin Informar</h6>
                        <p>({ordersWithoutInformed.length})</p>
                    </div>
                    <div className="cardsContainerOrders shadow">
                        <h6><FontAwesomeIcon icon={faInfoCircle} /> En Proceso de confirmación</h6>
                        <p>({ordersInConfirmation.length})</p>
                    </div>
                    <div className="cardsContainerOrders shadow">
                        <h6><FontAwesomeIcon icon={faCheck} /> Confirmados</h6>
                        <p>({ordersConfirmed.length})</p>
                    </div>
                </div>
                <div className="mb-5">
                    <input
                        className="form-control mt-4 container bg-dark text-light"
                        placeholder="ingrese email para buscar un pedido en particular..."
                        name="search"
                        onChange={(e) => setOrderSearch(e.target.value)}
                    />
                </div>
                <div>
                    <table className="table table-dark table-responsive text-light container">
                        <thead>
                            <tr>
                                <th scope="col">Usuario</th>
                                <th scope="col">Email</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Pais</th>
                                <th scope="col">Total</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elementSearch?.slice(
                                (counter - 1) * maxOrders,
                                (counter - 1) * maxOrders + maxOrders
                            ).map((order) => (
                                <AdminOrderDatabaseItem key={order._id} order={order} payment={payments} />
                            )).reverse()}
                        </tbody>
                    </table>
                    <div className="mt-5 mb-5">
                        <Pagination
                            page={counter}
                            decrement={decrement}
                            increment={increment}
                            lastPage={lastPage}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
