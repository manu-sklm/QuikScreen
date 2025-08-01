import React from 'react'

import { useState,useEffect } from 'react';
import { dummyBookingData } from '../../assets/assets';
import Loader from '../../components/Loader';
import dateTimeFormat from '../../../lib/dateTimeFormat';
import Title from '../../components/admin/Title';

import { useDispatch,useSelector } from 'react-redux';
import { fetchBookings } from '../../redux/adminSlice';
const ListBookings = () => {
   
 
    const {user} =useSelector((state)=>state.auth);
    const {loading,error,bookings} =useSelector((state)=>state.admin);
    const dispatch=useDispatch();


    
    const currency= import.meta.env.VITE_CURRENCY
  
   
  
    useEffect(()=>{
      if(user)
      dispatch(fetchBookings());
    },[user]);

  if(error) return toast.error(error)  
  if(loading) <Loader/>
  return  (


    <div>

        <Title text1={"List"} text2={"Bookings"}/>

        <div className='max-w-4xl mt-6 overflow-x-auto '>



           <table className='w-full border-collapse rounded-md text-nowrap'>

           <thead>

              <tr className='bg-primary/20 text-left text-white'>
                <th className='p-2 font-medium pl-5'>User Name</th>
                <th className='p-2 font-medium'>Movie Name</th>

                <th className='p-2 font-medium'>Show Time</th>
                <th className='p-2 font-medium'>Seats</th>
                <th className='p-2 font-medium'>Amount</th>
              </tr>
           </thead>

           <tbody>
            {
              bookings.map((show,index)=>(


             
                <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10' >
                  <td className='p-2 min-w-45 pl-5'> {show.user.name}</td>
                  <td className='p-2 min-w-45 pl-5'> {show.show.movie.title}</td>

                  <td className='p-2'> { dateTimeFormat(show.showDateTime)}</td>
                  <td className='p-2'> {show.bookedSeats.join(" ,")}</td>
                  <td className='p-2'> {currency} {show.amount}</td>
                </tr>
              ))
            }


            
           </tbody>



         


           </table>
            {bookings.length===0&&
              <div className='flex items-center justify-center w-full min-h-[50vh]'>
                <p className='text-gray-400 font-semibold text-xl'>No bookings !</p>
                      
              </div>
          }
        </div>
    </div>
    
  )
}

export default ListBookings