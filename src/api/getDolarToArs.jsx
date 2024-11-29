import React, {useState, useEffect} from 'react'
import axios from 'axios';

export const getDolarToArs = () => {

    const apiUrl = import.meta.env.VITE_API_GETDOLARBLUE_URL;

    const [dataDolarBlue, setDataDolarBlue] = useState([])

    const getDolarBlueToArs = async () => {
        try{
          const response = await axios.get(apiUrl);
          setDataDolarBlue(response.data);
        }catch(error){
          console.log(error)
        }
        
        };
    
    
    
        useEffect(() => {
            getDolarBlueToArs();
        }, [])


    return {
        getDolarBlueToArs,
        dataDolarBlue,
    }
    
}

export default getDolarToArs;
