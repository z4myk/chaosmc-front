import React from 'react'
import { useCartContext } from '../../../context/CartContext';
import { useAuthStore } from '../../../hooks/useAuthStore';
import {Link, useNavigate} from 'react-router-dom'
import chaosmclogo from '../../../assets/chaosmclogo.png'
import {useForm} from '../../../hooks/useForm';
import axios from 'axios'
import Swal from 'sweetalert2'

const formFields = {
  username: "",
  email: "" ,
  minecraftOption: "",
  country: "",
  details: "",
  status: "Sin Informar", 
  totalPrice: "",
  confirmationCypto: "",
}

export const Checkout = () => {

  const { onInputChange, formState} = useForm(formFields);
    const {status, user} = useAuthStore();
    const navigate = useNavigate();

    const userEmail = user.email;

    const {
        cartItems,
        getTotalPrice,
      } = useCartContext();

      const calculateDetails = () => {
        const totalDetails = cartItems.map((items) => (items.name + " "  + "Cantidad: " + items.quantity + " Modalidad: " + items.servers[0].name))
        return totalDetails;
      };



      const URL = import.meta.env.VITE_API_URL;

    

        const formData = {
          username: formState.username,
          email: userEmail,
          minecraftOption: formState.minecraftOption,
          country: formState.country,
          details: calculateDetails(),
          status: formState.status,
          totalPrice: getTotalPrice(),
          confirmationCypto: formState.confirmationCypto,
        };

       

        const clearShopInformationAndRedirect = () => {
          navigate("/mi-cuenta");
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        }

        const handleSubmit = async(e) => {
          e.preventDefault();

          if(formState.username === ""){
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Por favor, complete todos los campos",
              showConfirmButton: false,
              background: "#1a1a1a",
              border: "1px solid red",
              color: "#ffffff",
              timer: 1500,
            });
          }
          if (formState.minecraftOption === "Seleccione una opción" || formState.country === "Seleccione una opción") {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Por favor, seleccione una opción válida en todos los campos.",
              background: "#1a1a1a",
              border: "1px solid red",
              color: "#ffffff",
              showConfirmButton: false,
              timer: 1500,
            });
           
            return;
          }

          if (formState.country === "Soy de otro pais" && formState.confirmationCypto === "Seleccione una opción") {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Debe confirmar si pagará con cripto.",
              background: "#1a1a1a",
              border: "1px solid red",
              color: "#ffffff",
              showConfirmButton: false,
              timer: 1500,
            });
           
            return;
          }
          
          try{
            const res = await axios.post(`${URL}/orders`, formData)
            console.log(res)
            if (res && res.status) {
              if (res.status === 200 || res.status === 201) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "El pedido fue realizado con éxito!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setTimeout(() => {
                  clearShopInformationAndRedirect();
                }, 2000)
              }
            }
          }catch(error){
              console.log(error)
          }
        }
      
    const serverNameMap = {
        "ChaosMC Gens": "Demonic Gens",
        "Void Gens 1": "Void Gens",
        'ChaosMC Gens 2' : 'Demonic Gens'
      };
    
      const getDisplayName = (server) => {
        return serverNameMap[server] || server;
      };

      const calculateSubtotal = (item) => {
        const price = parseFloat(item?.discountedPrice) || 0; // Convierte la cadena a número
        return (price * item.quantity).toFixed(2); // Calcula el subtotal y redondea
      };

    return (
        <section className="container mt-3 p-1">

            <div className="alert alert-danger">
            <h6 className="text-center"> 🚨 ATENCION: LEER ANTES DE ADQUIRIR 🚨</h6>
<p className="small">● Al ingresar su nombre de usuario, asegúrese de que distinga entre mayúsculas y minúsculas. </p>
<p className="small"> ● Las compras pueden tardar hasta 30 minutos en procesarse.</p>
<p className="small"> ● Las compras son <b>DEFINITIVAS</b> y <b>NO REEMBOLSABLES.</b></p>
<p className="small"> ● Si sos de otro pais que no sea <b>Argentina o Perú </b> unicamente se aceptan <b>pagos CRIPTO en USDT.</b></p>

            </div>

            <div className="row p-1">
            <div className="col-sm-12 col-md-7 text-light ">
  <h3 className="text-center"><b>Facturación y envío</b></h3>
  <hr />
  <div className="container">
    <form
      className="w-100 mb-5"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit();
      }}
    >
      <div>

        <label className="form-label">
          <i class="fi fi-ts-model-cube-space"></i> Nombre de usuario 
          <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control inputLogin p-2 text-light"
          placeholder="Nombre de usuario"
          required
          value={formState.username}
          onChange={(e) => {
            const username = e.target.value;
            const usernameRegex = /^[a-zA-Z0-9_]+$/; 
            if (username === '' || usernameRegex.test(username)) {
              onInputChange(e); 
            }
          }}
          name="username"
        />
        {formState.username && !/^[a-zA-Z0-9_]+$/.test(formState.username) && (
          <small className="text-danger">El nombre de usuario solo puede contener letras, números y guion bajo (_).</small>
        )}
      </div>

      <div className="mt-4">
        <label className="form-label">
          <i class="fi fi-ts-envelopes"></i> Email <span className="text-danger">*</span>
        </label>
        <input
          type="email"
          className="form-control inputLogin p-2 text-light"
          value={user.email}
          onChange={onInputChange}
          name="email"
          disabled
          required
        />
      </div>

      <div className="mt-4">
        <label className="form-label">
          <i class="fi fi-rr-angle-small-down"></i> Seleccione dispositivo <span className="text-danger">*</span>
        </label>
        <select
          className="form-control inputLogin p-2 text-light"
          value={formState.minecraftOption}
          onChange={onInputChange}
          name="minecraftOption"
        >
          <option value="Seleccione una opción">Seleccione una opción</option>
          <option>Minecraft Java</option>
          <option>Minecraft Bedrock</option>
        </select>
      </div>

      <div>
        <label className="form-label mt-4">
          <i class="fi fi-rr-angle-small-down"></i> Seleccione su País <span className="text-danger">*</span>
        </label>
        <select
          className="form-control inputLogin p-2 text-light"
          value={formState.country}
          onChange={onInputChange}
          name="country"
        >
          <option value="Seleccione una opción" className="text-secondary">Seleccione una opción</option>
          <option>Argentina</option>
          <option>Peru</option>
          <option>Soy de otro pais</option>
        </select>
      </div>

      {formState.country === "Soy de otro pais" && (
        <div className="mt-4">
          <label className="form-label">
            <i class="fi fi-rr-angle-small-down"></i> Confirmo que voy a pagar en Cripto con USDT <span className="text-danger">*</span>
          </label>
          <select
            className="form-control inputLogin p-2 text-light"
            value={formState.confirmationCypto}
            onChange={onInputChange}
            name="confirmationCypto"
          >
            <option value="Seleccione una opción">Seleccione una opción</option>
            <option>Si</option>
          </select>
        </div>
      )}
        <button className="btn btn-success w-100 mt-3 mb-5" type="submit" onClick={handleSubmit}  >
                <b>Realizar Pedido</b>
              </button>
    </form>
  </div>
</div>




                <div className="col-sm-12 col-md-5 text-light"> 
                
               <div>
               <h3 className="text-center">
              <b>Tu pedido</b>
              <hr />
            </h3>
            <div className="p-1 w-100">
              <table className="table table-dark table-hover table-responsive text-light container">
                <thead>
                  <tr className="border text-center">
                    <th></th>
                    <th>Producto</th>
                    <th>Modalidad</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {cartItems.map((items) => (
                    <tr className="border" key={items.id}>
                        <td>{items.image ? <img src={items.image} alt={items.name} className="w-100" /> : <img src={chaosmclogo} alt={items.name} className="w-100" /> }</td>
                      <td>{items.name}</td>
                      <td>{items.servers.length > 1 
  ? "Chaos MC Global" 
  : getDisplayName(items.servers[0].name)}</td>
                      <td>{items.quantity}</td>
                      <td>${(parseFloat(items?.discountedPrice) * (items?.quantity || 1)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="d-flex justify-content-center p-1 bg-dark border">
                <p className="mt-2">Total a pagar: </p>
                <p className="mt-2">
                  <b className="text-success mx-2 ">
                  ${getTotalPrice()} USD
                  </b>
                </p>
              </div>
              <div className="bg-dark p-3 border mt-3">
                <p className="text-center text-light small">
                 
                    Sus datos personales se utilizarán para procesar su pedido,
                    respaldar su experiencia en este sitio web y para otros
                    fines descritos en nuestra{" "}
                    <span className="text-primary">Política de Privacidad</span>.
                  
                </p>
              
            
              </div>
            
               </div>
                </div>
</div>
</div>
        </section>
    )
}
