

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFavorites } from "../../api/userApi";
const initialState={
    favorites:[],
    loading:false,
    error:null
}


export const fetchFavorites=createAsyncThunk("user/fetchFavorites",async(_,{getState,rejectWithValue})=>{
     try{ 
           
           const token=getState().auth.token;
           const res=await getFavorites(token);
           if(!res.success) {
              return  rejectWithValue(res.message);
           }
           return res.movies;  
   
   
       }catch(error)
       {   
   
            return rejectWithValue(error.response?.data?.message || error.message);
       }
})






const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{

    },
    extraReducers:builder=>{
        builder
           .addCase(fetchFavorites.pending,(state)=>{
                         state.loading=true;
                         state.error=null;
                         console.log("fetchFavorites pending !");
                         
            })
         
            .addCase(fetchFavorites.fulfilled,(state,action)=>{
                         state.loading=false;
                         state.favorites=action.payload;
                         console.log("fetchFavorites fulfiled !");
            })
         
            .addCase(fetchFavorites.rejected,(state,action)=>{
                         state.loading=false;
                         state.error=action.payload;
                         console.log("fetchFavorites rejected !");
         
            })
                   
    }



})




export default userSlice.reducer;