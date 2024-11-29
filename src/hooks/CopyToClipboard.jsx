import React, { useState } from 'react'
import Swal from "sweetalert2";
const CopyToClipboard = ({ text }) => {
    const [copied, setCopied] = useState(false);


    const handleClick = () => {
        const lowerCaseText = text.toLowerCase();
        navigator.clipboard.writeText(lowerCaseText).then(() => {
          setCopied(true);
            Swal.fire({
              title: "CHAOSMC.CO",
              text: "¡Esperamos verte en línea pronto!",
              showConfirmButton: true,
              confirmButtonColor: "green",
              background: "#1a1a1a",
              border: "1px solid red",
              color: "#ffffff",
              timer: 2000
            });
          
            setTimeout(() => {
              setCopied(false);
            }, 2000); // Volver a la palabra original después de 2 segundos
          }).catch(err => {
            console.error('Error al copiar al portapapeles:', err);
          });
    };
  
    return (
      <span onClick={handleClick} >
        {copied ? 'CHAOSMC.CO' : text.substring(5)}
      </span>
    );
  };
  
  export default CopyToClipboard;