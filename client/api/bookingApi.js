import api from './axiosInstance'


export const getOccupiedSeats = async(showId,token)=>{

    const res=await api.get(`/api/booking/seats/${showId}`,{
            headers:{ Authorization:`Bearer ${token}` }
         }
    )

    return res.data;
}




export const bookSeatsApi = async({showId,selectedSeats},token)=>{

    const res=await api.post('/api/booking/create',{showId,selectedSeats},{
            headers:{ Authorization:`Bearer ${token}` }
         }
    )

    return res.data;
}