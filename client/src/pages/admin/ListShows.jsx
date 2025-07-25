import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
import { dummyShowsData } from '../../assets/assets';
import Loader from '../../components/Loader';
import dateTimeFormat from '../../../lib/dateTimeFormat';
const ListShows = () => {

  const [shows,setShows]=useState([]);
  const [isLoading,setIsLoading]=useState(true);

  
  const currency= import.meta.env.VITE_CURRENCY

  const getAllShows= async ()=>{

    try{

      setShows([
        {
          movie:dummyShowsData[0],
             showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
            occupiedSeats: {
                A1: "user_1",
                B1: "user_2",
                C1: "user_3"
            }
        }]);

        setIsLoading(false);

    } catch(error){
      console.error(error);
    }
    
  }

  useEffect(()=>{

    getAllShows();


  },[]);
   

  return !isLoading ? (
    <div>
        <Title text1={"List"} text2={"Shows"}/>
        {console.log(shows)}

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
              shows.map((show,index)=>(


             
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
  ) :<Loader/>
}

export default ListShows