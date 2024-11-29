import React from 'react'
import CopyToClipboard from '../../hooks/CopyToClipboard';
import {getServerApi} from '../../api/getServerApi';
import {getDiscordApi} from '../../api/getDiscordApi';
import chaosmclogo from '../../assets/chaosmclogo.png'
import { useCartContext } from '../../context/CartContext';
export const Header = () => {

    const {serverMcData } = getServerApi();
    const {discordData, fetchDiscordApi} = getDiscordApi();
    const {numberDiscount} = useCartContext();

    return (
        <>
        <div data-aos="fade-right" data-aos-duration="1500" >

        <marquee className="text-light bg-danger p-2">💰 {numberDiscount?.discountPercentage || 0}% DE DESCUENTO EN TODA LA TIENDA 💰 ACEPTAMOS MERCADOPAGO, YAPE, O CRIPTO 💵 </marquee>
        <div className="headerContainer">
<div className="pb-4 pt-4 d-flex justify-content-between flex-wrap container text-light headerMobile">
            <div className="mt-5 textHeader">
        <h4 className="parrafoHeader"> <i class="fi fi-sr-play"></i> <CopyToClipboard text="PLAY.CHAOSMC.CO" /></h4>
        <p className="small text-light text-center parrafoHeader">HAZ CLICK PARA COPIAR</p>
        <span className="pin mt-1"></span> <p className="small text-light text-center"><i>{serverMcData ? serverMcData?.players?.online : 'Cargando'} jugadores online</i></p>
            </div>

            <div className="">
            <img src={chaosmclogo} className="logoNavbar logo" />
            </div>

            <div className="mt-5 textHeader">
                <a href="https://discord.com/invite/dnmPHcNcEY" target="_blank" className="">
        <h4 className="parrafoHeader"><i className="fi fi-brands-discord"></i> CHAOSMC.CO</h4></a>
        <p className="small text-light text-center parrafoHeader ">HAZ CLICK PARA UNIRTE</p>
        <span className="pin mx-1 mt-1"></span> <p className="small text-light text-center"><i> {discordData?.presence_count} usuarios online</i></p>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}
