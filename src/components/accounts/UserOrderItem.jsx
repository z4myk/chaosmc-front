import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const UserOrderItem = ({ order }) => {
  let statusClass = "";
  let statusTooltip = "";

  switch (order?.status) {
    case "Sin Informar":
      statusClass = "alert alert-danger text-center p-1 mt-3";
      statusTooltip = "Tu pago aún no ha sido informado. Por favor, completa el formulario de pago para que podamos procesar tu orden.";
      break;
    case "En Proceso de Confirmación":
      statusClass = "alert alert-warning text-center p-2 mt-3";
      statusTooltip = "Estamos verificando tu pago. Este proceso puede tardar unos minutos. Una vez confirmado, procederemos con el despacho de tus productos.";
      break;
    case "Confirmado":
      statusClass = "alert alert-success text-center p-2 mt-3";
      statusTooltip = "Tu pago ha sido confirmado. Estamos preparando tu pedido y será entregado pronto.";
      break;
    default:
      statusClass = "";
      statusTooltip = "";
  }

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  return (
    <>
      <section>
        <div
          className="card p-2 mb-3 shadow border-danger w-100 container"
          key={order._id}
        >
          <div className="d-flex justify-content-between">
            <p className="text-secondary mb-5">
              Pedido realizado el: {order?.createdAt.slice(0, 10)}
            </p>
          </div>

          <div className="text-center">
            <p>Tu compra se entregará en: <br/>
              <FontAwesomeIcon icon={faIdBadge} /> <b>{order.username}</b>
            </p>
            <p>
              Productos:<br/>
              {order?.details.map((detail, index) => (
                <span key={index}>
                  <b>{index + 1}) {detail}</b>
                  <br/>
                </span>
              ))}
            </p>
            <p className="mt-3">
              Total: <b className="text-success">${order?.totalPrice}</b> USD
            </p>
          </div>
          <div className={`${statusClass}`}>
            <b>
              <span>Estado:</span> {order?.status.toUpperCase()}{" "}
              <FontAwesomeIcon icon={faQuestionCircle} 
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title={statusTooltip}
              />
            </b>
          </div>
          <div className="d-flex justify-content-end">
            <Link
              to={`/mi-cuenta/pedido/${order._id}`}
              className="text-decoration-none"
            >
              <button className="btn btn-success">Pagar y informar pago</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
