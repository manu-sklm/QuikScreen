import React from 'react'

import { useState,useEffect } from 'react';
import { dummyBookingData } from '../../assets/assets';
import Loader from '../../components/Loader';
import dateTimeFormat from '../../../lib/dateTimeFormat';
import Title from '../../components/admin/Title'

const ListBookings = () => {
   

    const [shows,setShows]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
  
    
    const currency= import.meta.env.VITE_CURRENCY
  
    const getAllBookings= ()=>{

        setShows(dummyBookingData);
        setIsLoading(false);
  
    }
  
    useEffect(()=>{
      getAllBookings();
    },[]);

  
  return !isLoading?(


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
              shows.map((show,index)=>(


             
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
        </div>
    </div>
    
  ):<Loader/>
}

export default ListBookings