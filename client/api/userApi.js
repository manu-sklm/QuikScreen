
import api from "./axiosInstance";

export const getFavorites=async(token)=>{
     console.log("we are at getShow api !");
        const res = await api.get('api/user/favorites', {
            headers:{ Authorization:`Bearer ${token}` }
        })
        
        return res.data;
}