 import React, { useEffect, useState } from 'react'
import dateTimeFormat from '../../lib/dateTimeFormat';
import timeFormat from '../../lib/timeFormat';

import BlurCircle from '../components/BlurCircle';

import { useSelector,useDispatch } from 'react-redux';
import { fetchBookings } from '../redux/userSlice';
import Loader from '../components/Loader';
import { image_base_url } from '../config/constants';
import { Link } from 'react-router-dom';
 const Mybookings = () => {

   

  const {user}=useSelector(state=>state.auth);

  const {loading,error,bookings}=useSelector((state)=>state.user);
  const dispatch=useDispatch();

  // console.log("bookings: ",bookings);

  useEffect(()=>{
      if(user)
      dispatch(fetchBookings());
  },[user]);
   

  if(loading) return <Loader/>
  
   return  bookings?.length>0 ? (


    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
        <BlurCircle top="100px" left="100px"/>
        <BlurCircle bottom="0px" left="600px"/>

        <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>

        {bookings.map((item,index)=>(
          <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/8 border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>

            <div className='flex flex-col md:flex-row '>
                <img src={image_base_url+item.show.movie.poster_path} alt="" className='md:max-w-45 h-auto aspect-video object-cover object-center rounded'/>
9
                <div className='flex flex-col   p-4'>
                  <p className='text-xl font-semibold'>{item.show.movie.title}</p>
                  <p className='text-gray-400 text-sm'>{timeFormat(item.show.movie.runtime)}</p>
                  <p className='text-gray-400 text-sm mt-auto '>{dateTimeFormat(item.show.showDateTime)}</p>
                </div>

            </div>
                

             <div className='flex flex-col md:items-end md:text-right gap-2 p-4'>


                   <div className='flex items-center gap-3'>
                        <p className='text-2xl font-semibold'>${item.amount}</p>
                        {!item.isPaid && <Link to={item.paymentLink}  className='px-4 py-1.5 text-sm rounded-full bg-primary font-medium cursor-pointer hover:bg-primary-dull active:scale-95'>Pay Now</Link>}
                   </div>

                  <div className='text-sm'>

                    <p> <span className='text-gray-400'>Total Tickets :</span>{item.bookedSeats.length}</p>
                    <p> <span className='text-gray-400'>Seat Number :</span>{item.bookedSeats.join(", ")}</p>
                    
                  </div>
            </div>

          </div>
        ))}  
        
    </div>
   ):( 
            <div className='min-h-screen w-full flex justify-center items-center'>
              <h2 className='text-3xl font-bold text-center'> No bookins by the user yet !</h2>
            </div>
   
    )
   
 }
 
 export default Mybookings