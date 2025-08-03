
import api from "./axiosInstance";

export const getFavorites=async(token)=>{
   
        const res = await api.get('/api/user/favorites', {
            headers:{ Authorization:`Bearer ${token}` }
        })
        
        return res.data;
}



export const updateFavorite=async(movieId,token)=>{
     
        const res = await api.post('/api/user/update-favorite',{movieId}, {
            headers:{ Authorization:`Bearer ${token}` }
        })
        
        return res.data;
}



export const getBookings=async(token)=>{

        console.log("at bookings api !"); 
        const res = await api.get('/api/user/bookings', {
            headers:{ Authorization:`Bearer ${token}` }
        })
        
        return res.data;
}
