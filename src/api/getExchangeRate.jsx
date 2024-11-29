import React, {useState, useEffect} from 'react'
import axios from 'axios';
export const getExchangeRate = () => {
    const apiUrl = import.meta.env.VITE_API_GETEXCHANGERATE_URL;

    const [dataExchangeCop, setDataExchangeCop] = useState({})
    const [dataExchangePen, setDataExchangePen] = useState({})

    const getExchange = async () => {
        try{
          const response = await axios.get(apiUrl);
          setDataExchangeCop(response.data?.conversion_rates.COP);
          setDataExchangePen(response.data?.conversion_rates.PEN)
        }catch(error){
          console.log(error)
        }
        
        };
    
    
    
        useEffect(() => {
            getExchange();
        }, [])


    return {
        getExchange,
        dataExchangeCop,
        dataExchangePen,
    }
}

export default getExchangeRate;
