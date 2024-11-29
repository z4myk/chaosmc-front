import axios from 'axios';
import React, {useEffect, useState} from 'react'

export const getDiscordApi = () => {

        const [discordData, setDiscordData] = useState([]);

        const discordUrl = import.meta.env.VITE_API_SERVERDISCORD_URL;

        const fetchDiscordApi = async() => {
            try{
               const response = await axios.get(discordUrl)
               setDiscordData(response.data)
            }catch(error){

            }

        }

       useEffect(() => {
        fetchDiscordApi();
       }, [])

    return {
        fetchDiscordApi,
        discordData,
    }
    
}
