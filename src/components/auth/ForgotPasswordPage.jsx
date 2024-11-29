import React from 'react'
import productApi from '../../api/productsApi';
import {useForm} from '../../hooks/useForm';
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom'
import chaosmclogo from '../../assets/chaosmclogo.png'
const ForgotFormFields = {
    email: '',
}
export const ForgotPasswordPage = () => {
    const { email, onInputChange } = useForm(ForgotFormFields);
    const navigate = useNavigate();
    const handleForgotPassword = async (event) => {
        event.preventDefault();
        try {
            const { data } = await productApi.post('/forgot-password', { email });
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico.",
                showConfirmButton: false,
                timer: 3000,
              });
              navigate('/');
            console.log(data);        
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "No se encontro una cuenta con este email",
                showConfirmButton: false,
                timer: 3000,
              });
            console.log(error);
        }
    }


    return (
        <>
        <div className="container mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-header text-light text-center">
                            Recuperar Contraseña
                        </div>
                        <div className="card-body ">
                            <form>
                                <div className="form-group">
                                <div className="text-center">
                    <img src={chaosmclogo} className="w-25 mt-3 mb-3"/>
            </div>
                                    <p className="text-light text-center"><i class="fi fi-tr-user-key"></i> ¿Tienes problemas para iniciar sesión?</p>
                                    <p className="text-light small">Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.</p>
                                    <p className="text-light small"> <span className="text-danger">*</span> Verifique la sección de <b>SPAM</b> una vez ingresado el correo electronico</p>
                                    <input value={email} onChange={onInputChange} name='email' type="email" className="form-control mb-4 bg-dark text-light" id="email" placeholder="Ingresa tu correo electrónico" />
                                </div>
                                <button type="submit" onClick={handleForgotPassword} className="btn btn-success w-100">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
