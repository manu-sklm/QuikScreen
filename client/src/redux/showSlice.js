import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNowPlayingMovies, getShows } from "../../api/showApi";

const initialState={
    nowPlayingMovies :[],
    shows:[],
    loading:false,
    error:null
}

export const fetchNowMovies=createAsyncThunk('admin/fetchNowMovies',async(_,{getState,rejectWithValue})=>{
      
    try{ 
        
        const token=getState().auth.token;
        const res=await getNowPlayingMovies(token);
        if(!res.success) {
           return  rejectWithValue(res.message);
        }
        
        return res.movies;  


    }catch(error)
    {   

         return rejectWithValue(error.response?.data?.message || error.message);
    }
});



export const fetchAllshows=createAsyncThunk('show/fetchAllShows',async(_,{getState,rejectWithValue})=>{
      
    try{ 
        
        const token=getState().auth.token;
        const res=await getShows(token);
        if(!res.success) {
           return  rejectWithValue(res.message);
        }
        
        return res.shows;  


    }catch(error)
    {   

         return rejectWithValue(error.response?.data?.message || error.message);
    }
});





export const showSlice=createSlice({
    name:'show',
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder
            //fetchNowMovies for admin dahsboard
            .addCase(fetchNowMovies.pending,(state)=>{
                state.loading=true;
                state.error=null;
                console.log("fetchNowMovies pending !");
                
            })

            .addCase(fetchNowMovies.fulfilled,(state,action)=>{
                state.loading=false;
                state.nowPlayingMovies=action.payload;
                console.log("fetchNowMovies fulfiled !");
            })

            .addCase(fetchNowMovies.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
                console.log("fetchNowMovies rejected !");

            })

            // fetchAllshows for home page

              .addCase(fetchAllshows.pending,(state)=>{
                state.loading=true;
                state.error=null;
                console.log("fetchNowMovies pending !");
                
            })

            .addCase(fetchAllshows.fulfilled,(state,action)=>{
                state.loading=false;
                state.shows=action.payload;
                console.log("fetchNowMovies fulfiled !");
            })

            .addCase(fetchAllshows.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
                console.log("fetchNowMovies rejected !");

            })


    }
});




export default showSlice.reducer;
