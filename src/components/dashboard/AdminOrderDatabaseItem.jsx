import {
  faCheck,
  faExclamationCircle,
  faEye,
  faInfoCircle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from 'react-router-dom'
import React from "react";
import Swal from 'sweetalert2'
import axios from 'axios'


export const AdminOrderDatabaseItem = ({ order, payment }) => {

  const URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  let statusClass = "";
  switch (order?.status) {
    case "Sin Informar":
      statusClass = "bg-danger text-light";
      break;
    case "En Proceso de Confirmación":
      statusClass = "bg-warning text-light";
      break;
    case "Confirmado":
      statusClass = "bg-success text-light";
      break;
    default:
      statusClass = "";
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Sin Informar":
        return <FontAwesomeIcon icon={faExclamationCircle} />;
      case "En Proceso de Confirmación":
        return <FontAwesomeIcon icon={faInfoCircle} />;
      case "Confirmado":
        return <FontAwesomeIcon icon={faCheck} />;
      default:
        return null; // Si no hay estado coincidente, no se muestra ningún icono.
    }
  };

  const redirectToDashboard = () => {
    navigate("/admin/dashboard/orders");
    window.location.reload();
  };


  const payInformation = payment.filter(
    (pay) => pay.paymentId === order._id
  ); 

  console.log(payInformation._id)

  const statusIcons = getStatusIcon(order?.status);

  const startDeleteOrder = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro de borrar este pedido?',
        text: "Esta acción no se puede revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        await axios.delete(`${URL}/orders/${id}`);
        const paymentInformation = payment.find(pay => pay.paymentId === id);
        if (paymentInformation) {
          await axios.delete(`${URL}/payment/${paymentInformation._id}`);
        }
        Swal.fire(
          '¡Borrado!',
          'El pedido ha sido borrado.',
          'success'
        );
        setTimeout(() => {
          redirectToDashboard();
        }, 1000);
      }
    } catch (error) {
      console.error('Error eliminando el pedido y el pago:', error);
      Swal.fire(
        'Error',
        'Hubo un problema al intentar eliminar el pedido y el pago.',
        'error'
      );
    }
  };


  return (
    <>
      <tr>

        {order?.minecraftOption === "Minecraft Bedrock" ? (
            <td><b className="text-danger">.</b>{order?.username}</td>

        ) : (
            <td>{order?.username}</td>
        )}
        <td>{order?.email}</td>

        <td className={`${statusClass}`}>
          {statusIcons} {order?.status}
        </td>
        <td >
        {order?.country}
        </td>
        <td className="text-success">${order?.totalPrice}USD</td>
        <td>{order?.date.slice(0, 10)}</td>
        <td>
        <Link to={`/admin/dashboard/orders/${order?._id}`}>
          <button className=" btn btn-primary text-light">
            <FontAwesomeIcon icon={faEye} />
          </button>{" "}
        </Link>
          <button className="btn btn-danger" onClick={() => startDeleteOrder(order._id)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </td>
      </tr>
    </>
  );
};
