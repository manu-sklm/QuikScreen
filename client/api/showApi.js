
import api from './axiosInstance';

//to func api to check admin 
export const getNowPlayingMovies=async (token)=>{
         console.log("we are at showapi");
        const res = await api.get('/api/show/now-playing', {
            headers:{ Authorization:`Bearer ${token}` }
        })
        
        return res.data;
   
}


export const getShows=async(token)=>{
     console.log("we are at getShows api !");
        const res = await api.get('/api/show/all', {
            headers:{ Authorization:`Bearer ${token}` }
        })
        
        return res.data;
}