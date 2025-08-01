import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBookings, getDashboardData, getListOfShows } from "../../api/adminApi";

const initialState={
    dashboardData :{},
    loading:false,
    error:null,
    showsList:[],
    bookings:[]
}

export const fetchDashboardData=createAsyncThunk('admin/fetchDashboardData',async(_,{getState,rejectWithValue})=>{
      
    try{ 
        
        const token=getState().auth.token;
        const res=await getDashboardData(token);
        console.log(res);
        if(!res.success) {
           return  rejectWithValue(res.message);
        }
        return res.dashboardData;  


    }catch(error)
    {   

         return rejectWithValue(error.response?.data?.message || error.message);
    }
});


export const fetchListOfShows=createAsyncThunk('admin/fetchListOfShows',async(_,{getState,rejectWithValue})=>{
      
    try{ 
        
        const token=getState().auth.token;
        const res=await getListOfShows(token);

        if(!res.success) {
           return  rejectWithValue(res.message);
        }
        return res.shows;  


    }catch(error)
    {   

         return rejectWithValue(error.response?.data?.message || error.message);
    }
});





export const fetchBookings=createAsyncThunk('admin/fetchBookings',async(_,{getState,rejectWithValue})=>{
      
    try{ 
        
        const token=getState().auth.token;
        const res=await getAllBookings(token);

        if(!res.success) {
           return  rejectWithValue(res.message);
        }
        return res.bookings;  


    }catch(error)
    {   

         return rejectWithValue(error.response?.data?.message || error.message);
    }
});



export const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder
            .addCase(fetchDashboardData.pending,(state)=>{
                state.loading=true;
                state.error=null;
                console.log("fetchDashboard pending !");
                
            })

            .addCase(fetchDashboardData.fulfilled,(state,action)=>{
                state.loading=false;
                state.dashboardData=action.payload;
                console.log("fetchDashboard fulfiled !");
            })

            .addCase(fetchDashboardData.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
                console.log("fetchDashboard rejected !");

            })



              .addCase(fetchListOfShows.pending,(state)=>{

                state.loading=true;
                state.error=null;
                console.log("fetchListShows pending !");
                
            })

            .addCase(fetchListOfShows.fulfilled,(state,action)=>{

                state.loading=false;
                state.showsList=action.payload;
                console.log("fetchListShows fulfiled !");
            })

            .addCase(fetchListOfShows.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
                console.log("fetchListShows rejected !");

            })




               .addCase(fetchBookings.pending,(state)=>{

                state.loading=true;
                state.error=null;
                console.log("fetchBookings pending !");
                
            })

            .addCase(fetchBookings.fulfilled,(state,action)=>{

                state.loading=false;
                state.bookings=action.payload;
                console.log("fetchBookings fulfiled !");
            })

            .addCase(fetchBookings.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
                console.log("fetchBookings rejected !");

            })

    }
});




export default adminSlice.reducer;
