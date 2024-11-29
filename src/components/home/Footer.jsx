import React from 'react'
import chaosmclogo from '../../assets/chaosmclogo.png'
export const Footer = () => {
    return (
        <footer className="navbarBackground text-light p-5">
            <section className="row container ">
                <div className="col-sm-12 col-md-2">
                    <img src={chaosmclogo} className="w-100" />
                </div>
                <div className="col-sm-12 col-md-4 boxFooter">
                    <h6>Nosotros</h6>
                    <p className="small text-secondary">ChaosMC es más que un simple servidor de Minecraft, ¡es una comunidad en constante crecimiento y evolución! Nuestro objetivo es proporcionar un ambiente acogedor y divertido para jugadores de todas las edades y habilidades. Con una variedad de modalidades de juego, eventos emocionantes y una comunidad amigable, ¡hay algo para todos en ChaosMC!</p>
                </div>
                <div className="col-sm-12 col-md-3 boxFooter">
                   <h6>Links</h6>
                  <p className="text-secondary">Inicio</p>
                  <p className="text-secondary">Tienda</p>
                  <p className="text-secondary">Terminos & condiciones</p>
                  <p className="text-secondary">Política de privacidad</p>
                </div>
                <div className="col-sm-12 col-md-3 boxFooter">
                    <h6 className="mb-4">Siguenos en:</h6>
                    <div className="d-flex justify-content-between flex-wrap">
                    <i class="fi fi-brands-youtube"></i>
                    <i class="fi fi-brands-facebook"></i>
                    <i class="fi fi-brands-twitter-alt"></i>
                    <i class="fi fi-brands-instagram"></i>
                    <i class="fi fi-brands-tik-tok"></i>
                    </div>

                </div>
            </section>
            <p className="small text-secondary text-center mt-4">Copyright © ChaosMC 2024.
Desarrollado por <a href="https://www.aintech.com.ar" target="_blank" className="text-primary">aintech.com.ar</a>. ChaosMC Network NO esta afiliado a Minecraft, Mojang AB y/o Notch Development AB.</p>
        </footer>
    )
}
