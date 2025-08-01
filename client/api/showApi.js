
import api from './axiosInstance';

//to func api to check admin 
export const getNowPlayingMovies=async (token)=>{
         console.log("we are at showapi");
        const res = await api.get('/api/show/now-playing', {
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