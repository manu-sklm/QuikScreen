import React, { useEffect,useState } from 'react'
import Title from '../../components/admin/Title'
import { dummyShowsData } from '../../assets/assets'
import ShowCard from '../../components/admin/ShowCard'
import Loader from '../../components/Loader'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // import default styles
import { DeleteIcon } from 'lucide-react'


const Addshows = () => {
 
  const currency =import.meta.env.VITE_CURRENCY
  const [nowPlayingMovies,setNowPlayingMovies]=useState([]);
  const [selectedMovie,setSelectedMovie]=useState(null);
  const [dateTimeSelection,setDateTimeSelection]=useState({});
  const [dateTimeInput,setDateTimeInput]=useState("");
  const [showPrice,setShowPrice]=useState("");
   
 
  
   const handleDateTimeAdd=()=>{

       if(!dateTimeInput) return;
      const [date,time]=dateTimeInput.split("T");

       if(!date || !time) return;

      setDateTimeSelection((prev) => {
          console.log("Previous State:", prev);
          console.log("Selected Date:", date);
          console.log("Selected Time:", time);

          const times = prev[date] || [];
          console.log("Existing Times for this Date:", times);

          if (!times.includes(time)) {

            const updated = {
              ...prev,
              [date]: [...times, time]
            };

            console.log("New Time Added. Updated State:", updated);
            return updated;
          }

          console.log("Time already exists. No update needed.");
          return prev;
        });    
   }

   const handleDateTimeRemove=(date,time)=>
   {

          setDateTimeSelection((prev)=>{

              const filteredTimes=  prev[date].filter((t)=>t!==time);

              if(filteredTimes.length===0){
                const {[date]:_, ...rest}=prev;
                return rest;
              }

              return {
                ...prev,
                [date]:filteredTimes,
              };

          })
  }
  

  const handleAddShow=()=>{
    console.log("add show clicked");
  }


  const fetchShowData=()=>{
    setNowPlayingMovies(dummyShowsData);
  }

  useEffect(()=>{
    fetchShowData();
  })

  return nowPlayingMovies.length>0 ? (
    <div>



          <Title text1={"Add"} text2={"Shows"}/>
          <h1 className='text-lg font-medium mt-10'>Now Playing Movies</h1>

          <div className='overflow-x-auto  scroll-smooth'>

            <div className='py-4 flex flex-nowrap gap-4 group '>
                {
                  nowPlayingMovies.map((show)=>(

                    <ShowCard key={show.id}  show={show} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie}/>
                  ))
                }
              </div>
          </div>




              {/* FORM */}

              {/* price */}
          <div className='mt-6'>
              <h1 className='text-sm font-medium mb-2'>Show Price</h1> 
              <div className='flex items-center gap-2 px-3 py-2 border border-gray-600 w-max rounded-lg'>
                  <p className='text-sm text-gray-400'>{currency}</p>
                  <input value={showPrice} onChange={(e)=>setShowPrice(e.target.value)} type="text" placeholder='Enter show price'  className='outline-none'/>
              </div>
          </div>


       
           {/* Date and timee */}
 
          <div className="my-6">

              <label className="block text-sm font-medium mb-2">Select Date and Time</label>

              <div className="inline-flex gap-5 border border-gray-600 p-1 p1-3 rounded-lg"> 

                   <input value={dateTimeInput} onChange={(e)=>setDateTimeInput(e.target.value)} className="outline-none rounded-md" type="datetime-local"/>
                   <button onClick={handleDateTimeAdd} className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer">Add Time</button>

              </div>
         </div>  


        {/* Display Selected Times */}

          {Object.keys(dateTimeSelection).length>0 &&(
              <div className="my-6">

                <h2 className='text-sm font-medium mb-2'>Selected Date and Time</h2>

                <ul className='space-y-3'>

                   {Object.entries(dateTimeSelection).map(([date,times])=>(
                       <li key={date}>
                         
                        <div className='font-medium'>{date}</div>

                        <div className='flex flex-wrap gap-2 mt-1 text-sm'>

                           {times.map((time)=>(
                            <div className='border border-primary px-2 py-1 rounded-sm flex items-center justify-between gap-2'>
                              <span >{time}</span>
                              <DeleteIcon width={15} className=' text-red-500 cursor-pointer hover:text-red-700' onClick={()=>handleDateTimeRemove(date,time)}/>
                            </div>
                          ))}
                        </div>
                       
                       </li>
                  ))}
                </ul>
                           
                
                            
              </div>  
          )}
         



         <button onClick={handleAddShow} className='px-8 py-2 bg-primary hover:bg-primary-dull rounded-lg text-white transition cursor-pointer'>Add Show</button>
























           {/* react-datePicker */}
           {/* <div className='mt-6'>
              <h1 className='text-sm font-medium mb-2'>Select Date and Time</h1> 
              <div className='flex items-center gap-2 pl-3 p-1 border border-gray-600 w-max rounded-lg'>
                   <DatePicker
                      selected={dateTimeInput}
                      onChange={(dateTimeInput) => setDateTimeInput(dateTimeInput)}
                      showTimeSelect
                      timeFormat="hh:mm"
                      timeIntervals={30}
                      dateFormat="yyyy-MM-dd HH:mm"
                      placeholderText="Pick a date & time"
                      className=" text-white   outline-none"
                      withPortal
                   />

                  <button onClick={handleDateTimeAdd} className="bg-primary/80 text-white text-sm px-3 py-2 rounded-lg hover:bg-primary cursor-pointer">Add Time</button>
              </div> 
          </div> */}
          
     
    </div>
  ):<Loader/>
}

export default Addshows