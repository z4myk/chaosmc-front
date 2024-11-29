import React from 'react'
import {Link} from 'react-router-dom'
export const SelectShop = () => {
    return (
        <>
            <h1 className="text-center mt-5 text-light">Seleccione su tienda</h1>
            <hr />
        <section className="container mb-5 mt-5 text-light">
            <div className="row">
                <div className="col-sm-12 col-md-6">

                <Link to="https://chaosmc.tebex.io/">
                <div className="text-center mb-3">

                <button className=" btn btn-danger border-light mb-3 w-50 ">
                    <h2 className="text-light mt-3"> <i class="fi fi-rr-world mx-2 mt-2"></i> <br />Tienda <br />Internacional </h2>
                    </button>

                    <div className="">
                    <p className="text-secondary small">Todos los pagos se procesan a través de <b className="text-light">pasarelas de pago</b> <br />habilitadas para SSL para garantizar la seguridad de sus datos de pago.</p>
                    <p className="text-secondary small">Si sos de otro pais que no sea Argentina ni perú y no contas   con la posibilidad <br />  de pagar vía Cripto USDT te recomendamos que compres por aqui.</p>
                    </div>
                </div>
                </Link>
                </div>
                <div className="col-sm-1 col-md-6">
            <Link to="/tienda">
                <div  className="text-center">
                    
                    <button className=" btn btn-danger mb-3 w-50 border-light ">
                    <h2 className="text-light mt-3"> <i class="fi fi-rs-marketplace-store"></i> <br />Tienda <br /> Local </h2>
                    </button>
                    <div className="border-danger">
                        
                    <p className="text-secondary small">Todos los pagos se procesan a través de <b className="text-light">Transferencias bancarias</b>, <br/> Si sos de <b className="text-light">Argentina o Perú</b>, te recomendamos que compres por aquí.</p>
                    <p className="text-secondary small">Si sos de otro país y tenés la posibilidad de pagar  <br /> <b className="text-light">vía CRIPTO USDT</b> esta opción es ideal para vos, podés realizar tu compra aquí.</p>
                    </div>
                </div>
            </Link>
            </div>
            </div>
        </section>
        </>
    )
}
