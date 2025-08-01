import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice'
import adminReducer from './adminSlice'
import showReducer from './showSlice'
const store=configureStore({
    reducer:{
        auth:authReducer,
        admin:adminReducer,
        show:showReducer
    }
})


export default store;