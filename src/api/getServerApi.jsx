import React, {useState, useEffect} from 'react'
import axios from "axios";


export const getServerApi = () => {


    const [serverMcData, setServerMcData] = useState([])
    const apiUrl = import.meta.env.VITE_API_SERVERMC_URL;

    const getServerMcApi = async () => {
      try{
        const response = await axios.get(apiUrl);
        setServerMcData(response.data);
      }catch(error){
        console.log(error)
      }
      
      };

    useEffect(() => {
     getServerMcApi();
    },  [])
   

      
    return {
      getServerMcApi,
      serverMcData,

    }
        
    
}

export default getServerApi;