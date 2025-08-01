import { createSlice,createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { checkIsAdmin } from "../../api/authApi";

const initialState = {
    user:null,
    token:null,
    isAdmin:null,
    loading:null,
    error:null
}

export const fetchIsAdmin = createAsyncThunk('auth/fetchIsAdmin' ,async(_,{getState,rejectWithValue})=>{
    try{
        const token=getState().auth.token;
        const res= await checkIsAdmin(token);
        
        return res.isAdmin;
    }catch(error)
    {
        return rejectWithValue(error.response?.data?.message || error.message);
    }

});



export const authSlice = createSlice({
    name:"auth",
    initialState,

    reducers: { 
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setToken:(state,action)=>{
            state.token=action.payload;
        },
        logout:(state)=>{
          state.user=null;
          state.isAdmin=null;
          state.token=null;
          state.error=null;
          state.loading=null;
        }

    },

    extraReducers:builder=>{
        builder
          .addCase(fetchIsAdmin.pending,(state)=>{
            state.loading=true;
            state.error=null;
          })
          .addCase(fetchIsAdmin.fulfilled,(state,action)=>{
            state.loading=false;
            console.log("isadmin fullfilled");
            state.isAdmin=action.payload;
          })
          .addCase(fetchIsAdmin.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
          });
        
    }

});



export const {setUser,setToken,logout} =authSlice.actions;

export default authSlice.reducer;
