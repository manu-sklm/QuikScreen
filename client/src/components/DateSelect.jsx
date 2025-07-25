//Designed using flex

//  <div className='relative border border-primary/20  w-full  mt-30 bg-primary/10 px-10 py-5 rounded-lg'>
//                  <BlurCircle top="-100px" left='-100px'/>
//                  <BlurCircle bottom='-150px' right='-150px'/>
//                   <h1 className='font-bold text-lg '>Choose Date</h1>
               
               
//                     <div className='mt-5 flex flew-row max-md:flex-col justify-between mb-5' >

//                        <div className='flex flex-wrap max-md:justify-center max-md:px-20 gap-6 justify-start items-center text-center text-sm'>
//                             <ChevronLeft/>
//                             <button className='aspect-square h-14 border border-primary/70 flex flex-col items-center justify-center cursor-pointer '>
//                               <span>11</span>
//                               <span>Nov</span>
//                             </button>
//                             <button className='aspect-square h-14 border border-primary/70 flex flex-col items-center justify-center  cursor-pointer'>
//                               <span>12</span>
//                               <span>Nov</span>
//                             </button>
//                             <button className='aspect-square h-14 border border-primary/70 flex flex-col items-center justify-center cursor-pointer'>
//                                 <span>13</span>
//                                 <span>Nov</span>
//                             </button>
//                             <button className='aspect-square h-14 border border-primary/70 flex flex-col items-center justify-center cursor-pointer'>
//                               <span>14</span>
//                               <span>Nov</span>
//                             </button>

//                             <ChevronRight/> 
//                         </div> 
//                          {/* absolute top-1/2 right-10 */}
//                          <button className='  px-7 py-2 max-h-10 mt-2 bg-primary hover:bg-primary-dull rounded-md '>Book Now</button>
 
//                     </div>
// </div>




import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import {  ChevronLeft,ChevronRight} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'



const DateSelect = ({dateTime,id,ref}) => {

    const navigate=useNavigate();
    const [selected,setSelected]=useState(null);

    const onBookHandler=()=>{
        if(!selected){
            return toast("Please select a date");
        }
        navigate(`/movies/${id}/${selected}`);
        scrollTo(0,0);
    }
  return ( 

          // two ways achieve scroll to dateSection 1.a tag and id  2. useRef and scrollToView()
           <div id='dateSection' className='pt-30' ref={ref} >


                <div className='relative border border-primary/20  bg-primary/10 px-10 py-8 rounded-lg flex flex-col md:flex-row items-center justify-between max-md:justify-center'>

                                <BlurCircle top="-100px" left='-100px'/>
                                <BlurCircle bottom='-150px' right='-150px'/>


                            <div>
                                <h1 className='max-md:text-center font-bold text-lg '>Choose Date</h1>

                        
                                <div className='flex items-center gap-6 text-sm mt-5'>

                                     <ChevronLeft/>
                                        <div className='flex flex-wrap  gap-4'>


                                            {
                                                Object.keys(dateTime).map((date)=>(

                                                     <button onClick={()=>setSelected(date)}
                                                             key={date}
                                                           className={`aspect-square h-14  flex flex-col items-center justify-center cursor-pointer  rounded-md ${selected===date ? "bg-primary text-white ":"border border-primary/70"}`}>
                                                            <span>{new Date(date).getDate()}</span>
                                                            <span>{new Date(date).toLocaleDateString("en-US",
                                                                {month:"short"})}</span>
                                                     </button>
                                                ))
                                            }

                                            
                                        </div> 
                                
                                    <ChevronRight/> 
                                </div>

                            </div>

                              <button
                                onClick={onBookHandler}
                                className=' px-7 py-2 max-h-10 mt-10  bg-primary hover:bg-primary-dull transition-all rounded-md cursor-pointer'>

                                     Book Now
                             </button>
                            
       
                             
                
                                   
                 </div>
            </div>
  )
}

export default DateSelect