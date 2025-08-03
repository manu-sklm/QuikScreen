import api from './axiosInstance';

//to func api to check admin 
export const checkIsAdmin=async (token)=>{

    

        const res = await api.get('/api/admin/is-admin', {
            headers:{ Authorization:`Bearer ${token}` }
        })
        
        return res.data;
   
}
