import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice'
import adminReducer from './adminSlice'
import showReducer from './showSlice'
import userReducer from './userSlice'
const store=configureStore({
    reducer:{
        auth:authReducer,
        admin:adminReducer,
        show:showReducer,
        user:userReducer
    }
})


export default store;