import Navbar from './components/Navbar'
import { Route, Routes,useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Favorites from './pages/Favorites'
import Footer from './components/Footer'
import MoviesDetails from './pages/MoviesDetails'
import SeatLayout from './pages/SeatLayout'
import Mybookings from './pages/Mybookings'
import Dummy from './components/Dummy'

import {Toaster} from "react-hot-toast"


import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import Addshows from './pages/admin/AddShows'
import ListBookings from './pages/admin/ListBookings'
import ListShows from './pages/admin/ListShows'



import { useEffect } from 'react'
import { useUser,useAuth, SignUp } from '@clerk/clerk-react'
import {useDispatch,useSelector} from 'react-redux';
import {setUser,setToken,fetchIsAdmin} from './redux/authSlice';
import {fetchAllShows} from './redux/showSlice';


import toast from 'react-hot-toast'

const App = () => {
  const isAdminRoute=useLocation().pathname.startsWith('/admin');


  const {user}=useUser();
  const {getToken}=useAuth();
  const dispatch=useDispatch();
  const {isAdmin}=useSelector((state)=>state.auth);
  const navigate=useNavigate();


  const initAuth=async()=>{

    if(user)
    {
      dispatch(setUser(user));

      const token= await getToken();
      dispatch(setToken(token));

      dispatch(fetchIsAdmin()); //checks and sets isAdmin in redux store
      dispatch(fetchAllShows());

    }
  
  }


  // both useEffects runs just after first render(added in queue one by one) but isAdmin is intialy null..know:topics react-cycle,rendering useEffects etc
  useEffect(()=>{
    
     initAuth();

  },[user,getToken,dispatch]);

  // useEffect(()=>{
  //      //use changed !isAdmin to isAdmin===false , for reason know:react-life-cycle 
  //     //  if(isAdminRoute && isAdmin===false){
  //     //   navigate('/');// Redirect to home if not admin
  //     // }
  
  // },[isAdmin,isAdminRoute,navigate] ); //not need to add navigate for get rid of lit warnnig





  
  return (
    <>
    <Toaster/>
 
   {! isAdminRoute ? <Navbar/>:""}


   {/* <MoviesDetails/> */}
    
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/movies/:id' element={<MoviesDetails/>} />
        <Route path='/movies/:id/:date' element={<SeatLayout/>} />
        <Route path='/my-bookings' element={<Mybookings/>} />
        
        <Route path='/theaters' element={<Movies/>} />
        <Route path='/releases' element={<Movies/>} />
        <Route path='/favorites' element={<Favorites/>} />

        
         <Route path='/admin' element={ user ? <Layout /> : 
                  <div className='flex justify-center items-center min-h-screen'>
                      <SignUp/>
                  </div>}
             >                            
              <Route index element={<Dashboard />} />
              <Route path='add-shows' element={<Addshows />} /> 
              <Route path='list-shows' element={<ListShows />} />
              <Route path='list-bookings' element={<ListBookings />} />
        </Route>
      


        
        
        <Route path='*' element={<h1>404: Page Not Found</h1>} /> 

    </Routes>

     {! isAdminRoute ?     <Footer/>:""}
    
    </>
   
   
  )
}

export default App