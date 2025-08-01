import {createContext, useContext, useState} from 'react'
import axios from 'axios';
import { useUser,useAuth } from '@clerk/clerk-react';
import {Navigate, useLocation} from 'react-router-dom';   
import { use } from 'react';

axios.defaults.baseURL='http://localhost:3000/api'; 
export const AppContext=createContext()

export const AppProvider=({children})=>{
    const [isAdmin,setIsAdmin]=useState(false);
    const[shows,setShows]=useState([]);
    const[favorites,setFavorites]=useState([]);

    const {user}=useUser();
    const {getToken} = useAuth();
    const location=useLocation();
    const navigate=Navigate();
   
    const fetchIsAdmin=async()=>{
        try{
            const data=await axios.get('/api/admin/is-admin',{headers:{Authorization:`Bearer ${await getToken()}`}});
            setIsAdmin(data.isAdmin);

            if(!data.isAdmin && location.pathname.startsWith('/admin')){
               navigate('/'); // Redirect to home if not admin
               toast.error('You are not authorized to access dashboard ');
               

            }
            
        }catch(error){
            console.error('Error fetching admin status:', error);   
        }
    }


     const fetchShows=async()=>{
        try{
            const data=await axios.get('/api/show/all');
            if(data.success){
            setShows(data.shows);
            }else{
                console.error('Error fetching shows:', data.message);
            }
        }catch(error){
            console.error('Error fetching shows:', error);
        }
    }

    const fetchFavorites=async()=>{
        try{
            const data=await axios.get('/api/user/favorites',{headers:{Authorization:`Bearer ${await getToken()}`}})
            if(data.success){
                setFavorites(data.movies);
            }else{
                toast.error(data.message);
             
            }   
    }catch(error){
            console.error('Error fetching favorites:', error);
        }
    }


    useEffect(()=>{
        if(user){
            fetchIsAdmin();
            fetchFavorites();
        }
    },[user]);

    useEffect(()=>{

        fetchShows();
      
    },[]);

    const value={axios,fetchIsAdmin,fetchShows,fetchFavorites,isAdmin,shows,navigate,user,getToken};

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext=()=>useContext(AppContext);
