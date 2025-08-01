import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewShow, getNowPlayingMovies } from "../../api/showApi";

const initialState={
    nowPlayingMovies :[],
    loading:false,
    addShowLoading:false,

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


export const addShow=createAsyncThunk("admin/addShow",async(payload,{getState,rejectWithValue})=>{

    try{
         const token=getState().auth.token;
         const res = await addNewShow(token,payload);
        if(!res.success)
        {
          return  rejectWithValue(res.message);
        }


       return res.data;
    }catch(error){

        return rejectWithValue(error.response?.data?.message || error.message);
    }
});


export const showSlice=createSlice({
    name:'show',
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder
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

             .addCase(addShow.pending,(state)=>{
                state.addShowLoading=true;
                state.error=null;
                console.log("addShow pending !");
                
            })

            .addCase(addShow.fulfilled,(state,action)=>{
                state.addShowLoading=false;
                console.log("addShow fulfiled !");
            })

            .addCase(addShow.rejected,(state,action)=>{
                state.addShowLoading=false;
                state.error=action.payload;
                console.log("addShow rejected !");

            })

    }
});




export default showSlice.reducer;
