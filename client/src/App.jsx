import Navbar from './components/Navbar'
import { Route, Routes,useLocation } from 'react-router-dom'
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

const App = () => {
  const isAdminRoute=useLocation().pathname.startsWith('/admin');
  
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
        <Route path='/favorites' element={<Dummy/>} />


         
         <Route path='/admin' element={<Layout />}>
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