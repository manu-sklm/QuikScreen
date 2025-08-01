import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
import { dummyShowsData } from '../../assets/assets';
import Loader from '../../components/Loader';
import dateTimeFormat from '../../../lib/dateTimeFormat';

import { useDispatch,useSelector } from 'react-redux';

import { fetchListOfShows } from '../../redux/adminSlice';

const ListShows = () => {

  const {user}=useSelector((state)=>state.auth);  
  const {loading,error,showsList}=useSelector((state)=>state.admin);
  
  const dispatch=useDispatch();
  const currency= import.meta.env.VITE_CURRENCY


  useEffect(()=>{
    if(user){
    dispatch(fetchListOfShows())
      
    }
  },[user]);
   
  if(loading) return <Loader/>
  return  (
    <div>
        <Title text1={"List"} text2={"Shows"}/>
        {console.log(showsList)}

        <div className='max-w-4xl mt-6 overflow-x-auto'>



           <table className='w-full border-collapse rounded-md text-nowrap'>

           <thead>

              <tr className='bg-primary/20 text-left text-white'>
                <th className='p-2 font-medium pl-5'>Movie Time</th>
                <th className='p-2 font-medium'>Show Time</th>
                <th className='p-2 font-medium'>Total Bookings</th>
                <th className='p-2 font-medium'>Earnings</th>
              </tr>
           </thead>

           <tbody>
            {
              showsList.map((show,index)=>(


             
                <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10' >
                  <td className='p-2 min-w-45 pl-5'> {show.movie.title}</td>
                  <td className='p-2'> { dateTimeFormat(show.showDateTime)}</td>
                  <td className='p-2'> {Object.keys(show.occupiedSeats).length}</td>
                  <td className='p-2'> {currency} {Object.keys(show.occupiedSeats).length*show.showPrice}</td>
                </tr>
              ))
            }
           </tbody>






           </table>
        </div>
    </div>
  )
}

export default ListShows