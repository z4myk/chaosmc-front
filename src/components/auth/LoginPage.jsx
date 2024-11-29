import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import chaosmclogo from '../../assets/chaosmclogo.png'
import {useNavigate} from 'react-router-dom'
import {useAuthStore} from '../../hooks/useAuthStore';
import {useForm} from '../../hooks/useForm';
import Swal from "sweetalert2";
const formFields = {
    loginEmail: '',
    loginPassword:'',
}

export const LoginPage = () => {

    const {loginEmail, loginPassword, onInputChange} = useForm(formFields);
    const navigate = useNavigate();
    const {startLogin, errorMessage, status} = useAuthStore();


    useEffect(() => {
        if (status === 'authenticated') {
          navigate('/');
        }
      }, [status, navigate]);


    const handleLogin = async(e) => {
        e.preventDefault();

        try{
            const response = await startLogin({email: loginEmail, password: loginPassword });
            if (response && response.status) {
                if (response.status === 200 || response.status === 201) {
                    navigate('/');
                }
              }
        }catch(error){
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error de credenciales",
                text: "Por favor, verifica tu email y contraseña.",
                showConfirmButton: false,
                timer: 1500,
              });
              console.log(error);
        }
    }

    return (
        <section className="text-light container mt-5">
            <div className="">
                <div className="">
                <div className="text-center">
                <img src={chaosmclogo} className="logo logoNavbar" />
                </div>
                <div className=" p-5 container d-flex justify-content-center flex-wrap">
                    <form className="w-50" autoComplete="off" onSubmit={handleLogin}>
                        <div>
                            <label className="form-label"><i class="fi fi-ts-envelopes"></i> Email <span className="text-danger">*</span></label>
                            <input type="email bg-dark border-danger" className="form-control inputLogin p-2 text-light" placeholder="email" value={loginEmail} onChange={onInputChange} name="loginEmail"  required  />
                        </div>

                        <div className="mt-3">
                            <label className="form-label"><i class="fi fi-tr-user-key"></i> password <span className="text-danger">*</span></label>
                            <input type="password" className="form-control inputLogin p-2 text-light" placeholder="*******" name="loginPassword" value={loginPassword} onChange={onInputChange} required/>
                        </div>
                        <div className="text-center mt-4">
                        <button className="btn btn-success w-100">Iniciar Sesion</button>
                        <Link to="/auth/registrate">
                        <p className="mt-3 text-primary"><i>Crear una cuenta en chaosmc.co</i></p>
                        </Link>
                        <Link to="/recuperar-contraseña">
                        <p className="small">¿Olvidaste tu contraseña?</p>
                        </Link>
                        </div>
                    </form>
                </div>
                </div>

               
            </div>
        </section>
    )
}
