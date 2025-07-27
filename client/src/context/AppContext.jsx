import {createContext, useContext, useState} from 'react'

export const AppContext=createContext()

export const AppProvider=({children})=>{
    const [isAdmin,setIsAdmin]=useState(false);
    const[shows,setShows]=useState([]);
    const[favorites,setFavorites]=useState([]);
   
    const fetchIsAdmin=async()=>{
        try{
            const data=await axios.get('/api/admin/is-admin');
            
            if(data.success){
                setIsAdmin(data.isAdmin);
            }
    const value={}

    return(
        <AppContext.Provider value={{isAdmin,setIsAdmin,shows,setShows,favorites,setFavorites}}>
            {children}
        </AppContext.Provider>
    )