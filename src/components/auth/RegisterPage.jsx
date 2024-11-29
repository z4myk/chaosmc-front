import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import chaosmclogo from '../../assets/chaosmclogo.png'
import { useAuthStore } from '../../hooks/useAuthStore';
import {useForm} from '../../hooks/useForm';
import Swal from 'sweetalert2'
const formFields = {
    email: '',
    password: '',
    validPassword: '',
};


export const RegisterPage = () => {
    const {email, password, validPassword, onInputChange, formState} = useForm(formFields)
    const {startRegister, errorMessage} = useAuthStore();


    const handleRegister = async(e) => {
        e.preventDefault();
        
        if(password !== validPassword){
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error",
                text: "¡Las contraseñas no coinciden!",
                showConfirmButton: false,
                timer: 1500,
              });
              return;
        }
        try{
            const response = await startRegister(formState);
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "La cuenta fue registrada con exito!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
           
        }catch(error){
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error de credenciales",
                text: "Por favor, verifica tu email y contraseña.",
                showConfirmButton: false,
                timer: 1500,
              });
            console.log(error)
        }

    }

    useEffect(() => {
        if (errorMessage !== undefined) {
          Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
      }, [errorMessage])




    return (
        <section className="text-light container mt-5">
        <div className="">
            <div className="">
            <div className="text-center">
            <img src={chaosmclogo} className="logo logoNavbar" />
            </div>
            <div className=" p-5 container d-flex justify-content-center flex-wrap">
                <form className="w-50" onSubmit={handleRegister} >

                    <div className="mt-3">
                        <label className="form-label"><i class="fi fi-ts-envelopes"></i> Email <span className="text-danger">*</span></label>
                        <input type="email" className="form-control inputLogin p-2 text-light" onChange={onInputChange} name="email" value={email} placeholder="example@example.com" required  />
                    </div>

                    <div className="mt-3">
                        <label className="form-label"> <i class="fi fi-tr-user-key"></i> Contraseña <span className="text-danger">*</span></label>
                        <input type="password" className="form-control inputLogin p-2 text-light" name="password" value={password} onChange={onInputChange} placeholder="*******" required/>
                    </div>

                    
                    <div className="mt-3">
                        <label className="form-label"><i class="fi fi-tr-user-key"></i> Repetir contraseña <span className="text-danger">*</span></label>
                        <input type="password" className="form-control inputLogin p-2 text-light" name="validPassword" value={validPassword} onChange={onInputChange} placeholder="*******" required/>
                    </div>
                    <div className="text-center mt-4">
                    <button className="btn btn-success w-100" type="submit">Registrarse</button>
                    <Link to="/auth/iniciar-sesion">
                    <p className="mt-3 text-primary"><i>Iniciar sesion en chaosmc.co</i></p>
                    </Link>
                    </div>
                </form>
            </div>
            </div>

           
        </div>
    </section>
    )
}
