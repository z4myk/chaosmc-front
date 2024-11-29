import React, {useEffect, useState} from 'react'
import { useOrderContext } from '../../context/OrderContext';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import {getDolarToArs} from '../../api/getDolarToArs';
import {getExchangeRate} from '../../api/getExchangeRate';
import BankDetails from './BankDetails';
import axios from 'axios'
import Swal from 'sweetalert2'
const formFields = {
    bank: "",
    numberOperation: "",
    comments: "",
    paymentMethod: "",
    transferred: "",
    paymentId: "",

}

export const UserOrderPaymentId = () => {

    const {dataDolarBlue} = getDolarToArs();
    const {dataExchangeCop, dataExchangePen} = getExchangeRate();
    const navigate = useNavigate();
    const [orderById, setOrderById] = useState(null)
    const { id } = useParams();
    const {getOrderById} = useOrderContext();
    const [country, setCountry] = useState(null);
    const {formState, onInputChange, onResetForm} = useForm(formFields);
    const dolarToArs = orderById?.totalPrice * dataDolarBlue.venta;
    const dolarToPen = orderById?.totalPrice * dataExchangePen;
    const dolarToCop = orderById?.totalPrice * dataExchangeCop;
    const paymentAd = orderById?._id;
    let currencyConversion;
    let currencySymbol;
    
    
    switch (orderById?.country) {
        case 'Argentina':
          currencyConversion = dolarToArs?.toFixed(0);
          currencySymbol = "ARS";
          break;
          case 'Peru':
          currencyConversion = dolarToPen?.toFixed(0);
          currencySymbol = "PEN";
          break;
          case 'Colombia':
              currencyConversion = dolarToCop?.toFixed(0);
              currencySymbol = "COP";
              break;
              default:
                  currencyConversion = orderById?.totalPrice; 
                  currencySymbol = "USDT";
                  break;
                }
                
                const transferredAd = `${orderById?.totalPrice} USD - $ ${currencyConversion} ${currencySymbol}`;

    const formData = {
        bank: formState.bank,
    numberOperation: formState.numberOperation,
    comments: formState.comments,
    paymentMethod: formState.paymentMethod,
    transferred: transferredAd,
    paymentId: paymentAd,
    }

    const clearShopInformationAndRedirect = () => {
        navigate("/mi-cuenta");
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      }

      const URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        
        try{
            const res = await axios.post(`${URL}/payment`, formData)    
            if (res && res.status) {
                if (res.status === 200 || res.status === 201) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "El informe de pago fue realizado con éxito!",
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
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error",
                text: error.response.data.msg,
                showConfirmButton: false,
                timer: 3000,
              });
        }
  }


    useEffect(() => {
        getOrderById(id, setOrderById);

        
      }, []);

     
      

    return (
        <>
        {orderById !== null ? (
 <section className="container">
 <div className="bg-dark text-light mt-2 p-4 ">
     <h2 className="text-center">Datos de transferencia y informe de pago</h2>
 </div>

 <div className="row ">
     <div className="col-sm-12 col-md-6 mt-3 text-light ">
     <h3 className="text-center">Datos a transferir</h3>
     <hr />

     <BankDetails country={orderById?.country} totalPrice={orderById?.totalPrice} dolarToArs={dolarToArs} dolarToCop={dolarToCop} dolarToPen={dolarToPen} />

     <p className="text-danger">Por favor no olvides informarnos el pago para que podamos acreditarlo a tu cuenta.</p>
     </div>
     <div className="col-sm-12 col-md-6 text-light mt-3 mb-5">
         <form onSubmit={handleSubmit}>
         <h3 className="text-center">Informar pago realizado</h3>
         <hr />
         <div className="mb-3">
                 <label>Numero de pedido</label>
             <input className="form-control w-100" type="text" value={paymentAd} name="paymentId" onChange={onInputChange} disabled required/>
             </div>
             {orderById.country === "Soy de otro pais" ? (
  <div className="mb-3">
  <label>Medio de pago</label>
<select className="form-select" onChange={onInputChange} name="paymentMethod" value={formState.paymentMethod} required>
  <option selected>Elegir medio de pago</option>
  <option disabled>Transferencia Bancaria</option>
  <option disabled>Deposito</option>
  <option >Cripto</option>
</select>
</div>
             ): (
                <div className="mb-3">
                <label>Medio de pago</label>
            <select className="form-select" onChange={onInputChange} name="paymentMethod" value={formState.paymentMethod} required>
                <option selected>Elegir medio de pago</option>
                <option >Transferencia Bancaria</option>
                <option >Deposito</option>
                <option >Cripto</option>
            </select>
            </div>
             )}
           
             <div className="mb-3">
                 <label>Nombre del banco</label>
             <input className="form-control w-100" type="text" placeholder="ingrese aquí el nombre del banco" name="bank" value={formState.bank} onChange={onInputChange} required />

             </div>
             <div className="mb-3">
                 <label>Número de operación o comprobante</label>
             <input className="form-control w-100" type="number"  placeholder="ingrese aquí el Número de operación o comprobante" name="numberOperation" value={formState.numberOperation} onChange={onInputChange} />
             </div>
             <div className="mb-3">
                 <label>Total pagado $</label>
             <input className="form-control w-100" type="text" name="transferred" value={transferredAd} onChange={onInputChange} disabled/>
             </div>
             <div className="mb-3">
                 <label>Productos</label>
             <input className="form-control w-100" type="text" value={orderById?.details} disabled/>
             </div>
             <div className="mb-3">
                 <label>Comentario (opcional)</label>
                 <br />
             <textarea className="form-control" name="comments" value={formState.comments} onChange={onInputChange} ></textarea>
             </div>

             <button className="btn btn-success w-100 mt-2" type="submit"><b>Enviar</b></button>
         </form>
     </div>
 </div>
</section>
        ) : (
            <div className="mt-5 pt-5 text-center">
          <div className="loader"></div>
        </div>
        )}
           
        </>
    )
}
