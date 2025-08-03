
import api from './axiosInstance';

//to func api to check admin 
export const getNowPlayingMovies=async (token)=>{
        const res = await api.get('/api/show/now-playing', {
            headers:{ Authorization:`Bearer ${token}` }
        })
        
        return res.data;
   
}


export const getShows=async(token)=>{
        const res = await api.get('/api/show/all', {
            headers:{ Authorization:`Bearer ${token}` }
        })
        
        return res.data;
}


export const getShow=async(movieId,token)=>{
        const res = await api.get(`/api/show/${movieId}`, {
            headers:{ Authorization:`Bearer ${token}` }
        })
        
        return res.data;
}