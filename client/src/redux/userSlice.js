

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFavorites,updateFavorite } from "../../api/userApi";
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


export const updateFavorites=createAsyncThunk("user/updateFavorite",async(id,{getState,rejectWithValue})=>{
     try{ 
           
           const token=getState().auth.token;
                           //api
           const res=await updateFavorite(id,token);
           if(!res.success) {
              return  rejectWithValue(res.message);
           }
           return res;  
   
   
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
          

            //update favorites
             .addCase(updateFavorites.pending,(state)=>{
                         state.loading=true;
                         state.error=null;
                         console.log("updateFavorite pending !");
                         
            })
         
            .addCase(updateFavorites.fulfilled,(state,action)=>{
                         state.loading=false;
                         state.favorites=action.payload.movies;        // added this on own.... updates the favorites state after each update of favmovie
                         console.log("updateFavorite fulfiled !");
            })
         
            .addCase(updateFavorites.rejected,(state,action)=>{
                         state.loading=false;
                         state.error=action.payload;
                         console.log("updateFavorite rejected !");
         
            })
                   
    }



})




export default userSlice.reducer;