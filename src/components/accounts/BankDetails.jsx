import React, {useState} from 'react'
import mercadopago from '../../assets/mercadopago.png'
import yape from '../../assets/yape.png'
import bancolombia from '../../assets/bancolombia.png'
import binance from '../../assets/binance.png'
import scanqr from '../../assets/scanqr.png'
export const BankDetails = ({country, totalPrice, dolarToArs, dolarToCop, dolarToPen}) => {

    const [openCriptoDetails, setOpenCriptoDetails] = useState(false)


    const renderBankDetails = () => {
        switch (country) {
          case 'Argentina':
            return (
                <>
                {openCriptoDetails === true ? (
                    <div>
                     

                    <div>
                    <h3>Datos de billetera Cripto</h3>
                    {/* <img src={binance}  alt="binance" className="w-50" /> */}
                    <p>wallet: <span className="text-warning" > Binance</span></p>
                    <p>Dirección: TXVcKSN41r5kdVbquZQCVyKvHp5ndcbRXb</p>
                    <p>SCAN QR</p>
                    <img src={scanqr} alt="scan QR binance" className="w-25 mb-3" />
                    <p>Transferir: <span className="text-success">{totalPrice} USDT </span></p>
    
                  </div>
                      <button className="btn btn-dark text-warning mb-5 w-50" onClick={() => setOpenCriptoDetails(false)}>Cerrar wallet Cripto</button>
                      </div>

                ) : (
                    <div>
                    <h3>Datos Bancarios para Argentina</h3>
                      <img src={mercadopago}  alt="Mercado Pago" className="w-50" />
                    <p>Banco: Mercado Pago</p>
                    <p>CBU: 0000003100091088911599</p>
                    <p>Titular: Santiago Gutierrez</p>
                    <p>Alias: chaosmc</p>
                    <p>Transferir: <span className="text-success">${dolarToArs.toFixed(0)} ARS</span></p>

                    <button className="btn btn-dark text-warning mb-5 w-50" onClick={() => setOpenCriptoDetails(true)}>Mostrar wallet Cripto</button>
                    </div>
                )}

              </>
            );
          case 'Peru':
            return (
              <div>
                <h3>Datos Bancarios para Perú</h3>
                <img src={yape}  alt="yape Peru" className="w-50 mb-3" />
                <p>Banco: YAPE</p>
                <p>CCI: 943718137</p>
                <p>Titular: Fabrizio Lambruschini</p>
            <p>Transferir: <span className="text-success">${dolarToPen.toFixed(0)} PEN</span></p>
              </div>
            );


            case 'Soy de otro pais':
                return (
                  <div>
                    <h3>Datos de billetera Cripto</h3>

                    <p>wallet: <span className="text-warning" > Binance</span></p>
                    <p>Dirección: TXVcKSN41r5kdVbquZQCVyKvHp5ndcbRXb</p>
                    <p>SCAN QR</p>
                    <img src={scanqr} alt="scan QR binance" className="w-25 mb-3" />
                    <p>Transferir: <span className="text-success">{totalPrice} USDT </span></p>
                  </div>
                );
          default:
            return <p>No hay datos bancarios disponibles para este país.</p>;
        }
      };
    
      return (
        <div>

          {renderBankDetails()}
        </div>
      );
    };
    

export default BankDetails;
