import React, { useEffect } from 'react'
import { ArrowRight, Clock } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'

import  isoTimeFormat from '../../lib/isoTimeFormat'
import Loader from '../components/Loader'
import BlurCircle from '../components/BlurCircle'
import toast from 'react-hot-toast'
const SeatLayout = () => {

  const groupRows=[['A','B'],['C','D'],['E','F'],['G','H'],['I','J']];

  const {id,date}=useParams();
  const [selectedTime,setSelectedTime]=useState(null);
  const [selectedSeats,setSelectedSeats]=useState([]);

  const[show,setShow]=useState(null);

  const navigate=useNavigate();


  const handleClick=(seatId)=>{
    if(!selectedTime)
     return toast("Please select time first");

    if(!selectedSeats.includes(seatId) && selectedSeats.length>4 )
    return toast("You can only select 5 seats");
  
    setSelectedSeats(prev=> prev.includes(seatId)? prev.filter(seat=>seat!==seatId): [...prev,seatId])
  
  }



  const handleBooking =()=>{
    if(selectedSeats.length==0)
    { toast.error("Please select at least one seat before booking!");
     return
    }
     navigate("/my-bookings");
  }

  const getShow=()=>{
    const show=dummyShowsData.find(show=>show._id===id);
    if(show)
    {
      setShow({
        movie:show,
        dateTime:dummyDateTimeData
      })
    }
  }

  useEffect(()=>{

       getShow();  
  },[]);


  const renderSeats= (row,count=9)=>(
    
       <div className='flex flex-wrap gap-2 items-center justify-center  mt-3'>

          {Array.from({length:count},(_,i)=>{
            const seatId=`${row}${i+1}`;

            return ( 
              <button key={seatId} onClick={()=>handleClick(seatId)} className={`size-8 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId)&&"bg-primary text-white"}`} >
                    {seatId}
              </button>
            )
          })}
        </div>
   
    
       
  )



  return show ? (
   <div className=' relative flex flex-col md:flex-row  px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
        {/* <BlurCircle top='10' right='-100'/> */}

        {/* timings */}
        <div  className='w-60 flex flex-col   py-10  text-sm border border-primary/20  bg-primary/10 rounded-lg h-max md:sticky md:top-30' >


          <p className='text-lg font-semibold px-6'>Available Timings</p>

          <div className='mt-5 space-y-1'>

            {show.dateTime[date].map((item)=>(
                     
                      <div key={item.time} onClick={()=>setSelectedTime(item)} className={`flex items-center gap-2 py-2 px-6 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time===item.time ?  'bg-primary text-white' : ' hover:bg-primary/20'} `}>
                        <Clock className='size-4 '/>
                        <p  className='text-sm'> { isoTimeFormat(item.time) } </p>
                     </div>
              
            ))}
    
          </div>
         
        </div>

        {/* Seats */}
        <div  className= 'relative flex-1 flex flex-col items-center max-md:mt-16'>
          <BlurCircle top='-100px' left='-100px'/>
          <BlurCircle bottom='0' right='0'/>

          <h1 className='text-2xl font-semibold mb-6'>Select your seat</h1>
          <img src={assets.screenImage} alt="screen image" />
          <p className='text-gray-400 text-sm  mb-6'>SCREEN SIDE</p>
        
        
          <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>



                <div className='  grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
                      {groupRows[0].map(row=> renderSeats(row) )}
                </div>   

          
               <div className='grid grid-cols-2 gap-11 text-xs  '>
                      {groupRows.slice(1).map((group,idx)=>(
                        <div key={idx}>
                          {group.map(row=> renderSeats(row))}
                        </div>
                      ))}
               </div>
            </div>
             

        
        <button onClick={()=> handleBooking()} className=' flex gap-1 items-center px-8 py-3 bg-primary rounded-full mt-20 text-sm font-medium transition hover:bg-primary-dull cursor-pointer active:scale-95'>Proceed to Checkout <ArrowRight strokeWidth={3} className='size-4 '/> </button>
               
          
         
        </div>

    </div>
  ) :(<div>
    <Loader/>
      </div>)
}

export default SeatLayout