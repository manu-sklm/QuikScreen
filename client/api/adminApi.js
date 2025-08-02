
import api from './axiosInstance';

//to func api to check admin 
export const getDashboardData=async (token)=>{
         console.log("we are at api");
        const res = await api.get('/api/admin/dashboard', {
            headers:{ Authorization:`Bearer ${token}` }
        })
        
        return res.data;
   
}





export const addNewShow=async (token,showData)=>{
         console.log("we are at addShow api !");
        const res = await api.post('/api/show/add',showData, {
            headers:{ Authorization:`Bearer ${token}` }
        })
        
        return res.data;
   
}





export const getListOfShows=async (token)=>{
         console.log("we are at shows list api !");
        const res = await api.get('/api/admin/all-shows', {
            headers:{ Authorization:`Bearer ${token}` }
        })
        
        return res.data;
   
}




export const getAllBookings=async (token)=>{
         console.log("we are at all bookings  api !");
        const res = await api.get('/api/admin/all-bookings', {
            headers:{ Authorization:`Bearer ${token}` }
        })
        
        return res.data;
   
}

