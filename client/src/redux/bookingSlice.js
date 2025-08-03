

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookSeatsApi, getOccupiedSeats } from "../../api/bookingApi";

const initialState={
    occupiedSeats:[],
    loading:false,
    error:null
}


export const fetchOccupiedSeats =createAsyncThunk("booking/fetchOccupiedSeats",async(id,{getState,rejectWithValue})=>{

        try{

            const token=getState().auth.token;
            const res=await getOccupiedSeats(id,token);

            if(!res.success)
            {
                return rejectWithValue(res.message)
            } 

            return res.occupiedSeats;

        }catch(error)
        {
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
});




export const bookSeats =createAsyncThunk("booking/bookSeats",async({showId,selectedSeats},{getState,rejectWithValue})=>{

        try{
            const token=getState().auth.token;
            const res=await bookSeatsApi({showId,selectedSeats},token);
            console.log("at book seats",res);
            
            if(!res.success)
            {
                return rejectWithValue(res.message)
            }

            return res;

        }catch(error)
        {
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
});

// to say strictly: we don't need to export this ..we don't have reducers

export const bookingSlice=createSlice({
    name:"booking",
    initialState,
    reducers:{},
    extraReducers:builder=>{
                  builder
                     .addCase(fetchOccupiedSeats.pending,(state)=>{
                        state.loading=true;
                        state.error=null;
                       console.log("fetchOccupiedSeats pending !");


                     }) 
                     .addCase(fetchOccupiedSeats.fulfilled,(state,action)=>{
                        state.loading=false;
                        state.occupiedSeats=action.payload;
                        console.log("fetchOccupiedSeats fulfilled !");
                
                     })

                      .addCase(fetchOccupiedSeats.rejected,(state,action)=>{
                        state.loading=false;
                        state.error=action.payload;
                       console.log("fetchOccupiedSeats rejected !");
                        
                     })




                        .addCase(bookSeats.pending,(state)=>{
                        state.loading=true;
                        state.error=null;
                       console.log("bookSeats pending !");


                     }) 
                     .addCase(bookSeats.fulfilled,(state,action)=>{
                        state.loading=false;
                        console.log("bookSeats fulfilled !");
                        
                        
                     })

                      .addCase(bookSeats.rejected,(state,action)=>{
                        state.loading=false;
                        state.error=state.action.payload;
                       console.log("bookSeats rejected !");
                        
                     })
            }  
})




export default bookingSlice.reducer;