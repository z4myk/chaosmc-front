import React, { useEffect, useState } from "react";
import { useOrderContext } from "../../context/OrderContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
export const AdminOrderInformationId = () => {
  const URL = import.meta.env.VITE_API_URL;
  const { getOrderById, getPayments, payments } = useOrderContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [orderById, setOrderById] = useState(null);
  const [formValues, setFormValues] = useState({
    status: "",
  });

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    if (orderById !== null) {
      setFormValues({ ...orderById });
    }
  }, [orderById]);

  useEffect(() => {
    getOrderById(id, setOrderById);
    getPayments();
  }, []);

  const payInformation = payments.filter(
    (payment) => payment.paymentId === orderById?._id
  );

  const redirectToDashboard = () => {
    navigate("/admin/dashboard/orders");
    window.location.reload();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${URL}/orders/${orderById._id}`, {
        status: formValues.status,
      });
      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "El estado del pedido fue editado con exito!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          redirectToDashboard();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };





  let statusClass = "";

  switch (orderById?.status) {
    case "Sin Informar":
      statusClass = "text-danger";
      break;
    case "En Proceso de Confirmación":
      statusClass = "text-warning text-center ";
      break;
    case "Confirmado":
      statusClass = "text-success text-center";
      break;
    default:
      statusClass = "";

  }

  return (
    <>
      {orderById !== null ? (
        <>
          <div className="container">
            <Link to="/admin/dashboard/orders">
              <button className="btn btn-outline-dark text-light  border-danger mt-5">
                <i class="fi fi-ts-arrow-left-to-arc"></i>{" "}
                <span className="">Regresar </span>
              </button>
            </Link>
          </div>
          <section className="mt-5 row mb-5 pb-5 mx-5">
            <div className="col-md-4 col-sm-12 ">
              <h3 className="text-center text-light mt-4 ">Usuario</h3>
              <hr />
              <article className="bg-dark text-light p-3 text-center border shadow">
                <div>
                  {orderById.minecraftOption === "Minecraft Bedrock" ? (
                    <p>
                         Nickname: <br />
                      <b className="text-danger">.</b>
                      <span className="text-secondary">
                      {orderById.username}
                      </span>
                    </p>
                  ) : (
                    <p>
                      Nickname: <br />
                      <span className="text-secondary">
                      {orderById.username}
                      </span>
                    </p>
                  )}
                  <p>
                    Email: <br />
                    <span className="text-secondary">
                    {orderById.email}
                    </span>
                  </p>
                  <p>
                    Pais: <br />
                    <span className="text-secondary">
                    {orderById.country}
                    </span>
                  </p>
                  <p>
                    Dispositivo: <br />
                    <span className="text-secondary">
                    {orderById.minecraftOption}
                    </span>
                  </p>
                  <p>
                    Estado: <br />
                    <span className={statusClass}>{orderById.status}</span>
                  </p>
                </div>
              </article>
              <div className="mt-3 text-center text-light ">
                <h6 className="">Actualizar estado del pedido</h6>

                <form>
                  <select
                    className="form-select bg-dark text-light"
                    onChange={onInputChange}
                    name="status"
                    value={formValues.status}
                  >
                    <option selected>Seleccione el estado</option>
                    <option>Sin Informar</option>
                    <option>En Proceso de Confirmación</option>
                    <option>Confirmado</option>
                  </select>
                  <button
                    className="btn btn-success w-100 mt-1"
                    onClick={handleSave}
                  >
                    Actualizar
                  </button>
                </form>
              </div>
            </div>

            <div className="col-md-8 col-sm-12  ">
              <h3 className="text-center text-light mt-4">Detalle del Pedido</h3>
              <hr />
              <article className="bg-dark text-light p-3 mb-3 border shadow">
                <p className="text-center">
                  ID: <br />
                 <span className="text-secondary"> {orderById._id}</span>
                </p>
                <p className="text-center">
                  Fecha: <br />
                  <span className="text-secondary">{orderById.createdAt.slice(0, 10)}</span>
                </p>
                <p className="text-center">Productos:</p>
                <div className="d-flex justify-content-center">
                <ol > 
                  {orderById.details.map((detail, index) => (
                    <li className="text-secondary" key={index}>
                      {detail}
                      <br />
                    </li>
                  ))}
                </ol>
                  </div>
                <p className="text-center">
                  Precio total: <br />
                  <span className="text-success">
                    ${orderById.totalPrice}USD
                  </span>
                </p>
              </article>
              <h3 className="text-light text-center">Informe de Pago</h3>
              <hr />
              <article className="bg-dark text-light p-3 mt-3 border shadow">
                {payInformation.length === 0 ? (
                  <p className=" text-center">
                    No hay informe de pago disponible.
                  </p>
                ) : (
                  <div className="text-center">
                    <p>
                      Fecha de informe: <br />{" "}
                      <span className="text-secondary">
                      {payInformation[0].date.slice(0, 10)}
                      </span>
                    </p>
                    <p>
                      Banco o wallet: <br /> 
                    <span className="text-secondary">
                    {payInformation[0].bank}
                    </span>
                    </p>
                    <p>
                      Metodo de Pago: <br /> <span className="text-secondary">
                      {payInformation[0].paymentMethod}
                        </span>
                    </p>
                    <p>
                      Numero de Operación o Comprobante: <br />{" "}
                      {payInformation[0].numberOperation === null ? (
                        <span className="text-secondary">
                          No informo numero de comprobante
                        </span>
                      ) : (
                        <><span className="text-secondary">{payInformation[0].numberOperation}</span></>
                      )}
                    </p>
                    <p>
                      Dinero Transferido: <br />{" "}
                      <span className="text-success">
                        {payInformation[0].transferred}
                      </span>
                    </p>
                    <p>
                      Comentario: <br />{" "}
                      {payInformation[0].comments === "" ? (
                        <span className="text-secondary">
                          No ingreso ningún comentario
                        </span>
                      ) : (
                        <>{payInformation[0].comments}</>
                      )}
                    </p>
                  </div>
                )}
              </article>
            </div>
          </section>
        </>
      ) : (
        <div className="mt-5 pt-5 text-center">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};
