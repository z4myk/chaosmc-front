import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import productApi from '../../api/productsApi';
import chaosmclogo from '../../assets/chaosmclogo.png'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
export const ResetPasswordPage = () => {

    const { token } = useParams();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        const tokenDecode = atob(token);
        if (password !== confirmPassword) {
          
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Las contraseñas no coinciden",
                showConfirmButton: false,
                timer: 3000,
              });
            return;
        }

        const data = await productApi.post('/reset-password', { password:password, token:tokenDecode });
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "La contraseña se ha cambiado exitosamente",
            showConfirmButton: false,
            timer: 3000,
          });
          navigate('/');
        console.log(data);
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="container mb-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
            <div className="text-center">
                    <img src={chaosmclogo} className="w-25 mt-3"/>

            </div>
                <div className="card  mt-5">
                    <div className="card-header text-center text-light">Cambiar Contraseña</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="password" className=" mb-4 text-light">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Ingresa tu nueva contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="confirmPassword"  className=" mb-3 mt-4 text-light">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    placeholder="Confirma tu nueva contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-success w-100">Cambiar Contraseña</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
