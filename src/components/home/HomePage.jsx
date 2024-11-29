import React from 'react'
import kicklogo from '../../assets/kicklogo.png'
import { Header } from './Header'
import { MostPurchasedPackages } from './MostPurchasedPackages';
import chaossurvival from '../../assets/chaossurvival.png';
import infernalbox from '../../assets/infernalbox.png';
import voidgens from '../../assets/voidgens.png';
import demonicgens from '../../assets/demonicgens.png';
import pillars from '../../assets/pillars.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
export const HomePage = () => {
    AOS.init();
    return (
        <>
          <Header />
         
        <section className="mt-5 pt-5 ">
      
            
            <div className="" >
                
                <MostPurchasedPackages />

                <div className="mt-5 pb-5 pt-5 mb-5 container "  data-aos="fade-up"
     data-aos-duration="1500">
                    <h2 className="text-light text-center mb-5">CONDICIONES DE COMPRA</h2>
                    
                    <div>
                    <p className="small text-light">Los pagos realizados al Proveedor a través de <span className="text-danger">ChaosMC </span> constituyen el pago por los artículos virtuales incluidos en su compra. Esta transacción es definitiva y no admite reembolsos. En caso de que su cuenta sea prohibida o cancelada de acuerdo con nuestros Términos, no se efectuará ningún reembolso.</p>
                    <p className="small text-light">Las prohibiciones están a discreción del Proveedor y las reglas pueden modificarse en cualquier momento. No podemos garantizar el acceso continuo a nuestros Servicios, y en caso de cese de uso, los artículos virtuales asociados se perderán. Las solicitudes de reembolso por problemas como lag, errores en el juego u otros inconvenientes están sujetas a revisión por parte del equipo de administración de <span className="text-danger">ChaosMC</span>. Todos los artículos son virtuales y no poseen valor real. Le recomendamos leer detenidamente los Términos y condiciones completos antes de adquirir cualquier artículo.</p>
                    <div className="d-flex justify-content-around ">
                        <div className=" w-50 mx-1 ">
                        <h5 className="text-danger"> <i class="fi fi-rr-exclamation"></i> Condiciones de compra</h5>
                        <p className="text-light small">Aceptamos transferencias bancarias a múltiples bancos para mayor conveniencia. <br /> Intentar revertir un pago o abrir una disputa con la entidad bancaria resultará <br/> en un veto permanente e irreversible de todos nuestros servidores y otras tiendas.</p>
                        <button className="btn btn-outline-dark text-danger">Ver Terminos & Condiciones</button>
                        </div>

                        <div className=" w-50 mx-1">
                            <h5 className="text-danger"> <i class="fi fi-rs-shield-check"></i> Política de Privacidad</h5>
                            <p className="text-light small">Toda la información requerida en esta tienda en línea no se comparte con terceros <br /> y se almacena de manera segura. Todos los pagos se procesan a través de pasarelas habilitadas para SSL para garantizar la seguridad de sus datos de pago.</p>
                            <button className="btn btn-outline-dark text-danger">Ver Politicas de Privacidad</button>
                        </div>
                    </div>
                    </div>
                </div>


                
                <div className="container mt-5 p-5"  data-aos="fade-up"
     data-aos-duration="1500">
    <h2 className="text-center text-light">MODALIDADES</h2>
    <div className="d-flex justify-content-around pb-4 pt-5 flex-wrap gap-3">
        <div className="image-container">
            <img src={chaossurvival} alt="Chaos MC Survival" className="" />
            <div className="overlay-text"><h5>Chaos MC Survival</h5></div>
        </div>

        <div className="image-container">
            <img src={infernalbox} alt="Infernal Box" className="" />
            <div className="overlay-text"><h5>Infernal Box</h5></div>
        </div>

        <div className="image-container">
            <img src={voidgens} alt="Voidgens" className="" />
            <div className="overlay-text"><h5>Void Gens</h5></div>
        </div>
        <div className="image-container">
            <img src={demonicgens} alt="Demonic Gens" className="" />
            <div className="overlay-text"><h5>Demonic Gens</h5></div>
        </div>
        <div className="image-container">
            <img src={pillars} alt="Demonic Gens" className="" />
            <div className="overlay-text"><h5>Pillars</h5></div>
        </div>
    </div>
</div>




                <div className=" p-4 bg-dark " data-aos="fade-up"
     data-aos-duration="2000">
                    <div className="text-center">
                  <img src={kicklogo} className="kickLogo mb-5" alt="Kick logo"/>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                        <h5 className="text-light">¡Síguenos en Kick! Disfruta de nuestras transmisiones en vivo de Minecraft y más.</h5>
                        <hr className="text-success"/>
                        <p className=" text-light">Únete a nuestra comunidad en Kick y no te pierdas ninguna de nuestras emocionantes transmisiones en vivo. Desde épicas aventuras en nuestro servidor de Minecraft hasta emocionantes eventos y construcciones impresionantes, te ofrecemos entretenimiento sin fin. <br /> ¡Haz clic en el boton y sigue nuestro canal para estar al tanto de todas nuestras actividades y unirte a la diversión en tiempo real!</p>

                            <div className="mt-5 ">
                                <a href="https://kick.com/chaosmc" target="_blank"><button className="buttonKick w-100 mb-3 "><i className="animation"></i>¡Sigue nuestro canal en Kick ahora!<i class="animation"></i></button></a>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6">
                            <iframe className="w-100 mt-1" src="https://player.kick.com/chaosmc?autoplay=true?muted=true" height="400" width="600" frameborder="0" scrolling="no" allowfullscreen="true"></iframe>
                        </div>

                    </div>
                </div>

            </div>
        </section>
        </>
    )
}
