import { ChartLineIcon, CircleDollarSignIcon, DollarSign,  PlayCircleIcon, StarIcon, UsersIcon, VideoIcon } from 'lucide-react'
import { useEffect } from 'react'
import Loader from '../../components/Loader'
import { dummyDashboardData } from '../../assets/assets'
import BlurCircle from '../../components/BlurCircle'
import dateTimeFormat from '../../../lib/dateTimeFormat'
import Title from '../../components/admin/Title'

import { useSelector,useDispatch } from 'react-redux'
import { fetchDashboardData } from '../../redux/adminSlice'
const Dashboard2 = () => {
   

  const currency= import.meta.env.VITE_CURRENCY
  const dispatch=useDispatch();
  const {dashboardData,loading,error}=useSelector(state=>state.admin);

  console.log(dashboardData,loading,error);
  console.log("in Dashboard");
  const dashboardCards=[
    {title:"Total Bookings", value:dashboardData.totalBookings|| "0",icon:ChartLineIcon},
    {title:"Total Revenue", value:dashboardData.totalRevenue|| "0",icon:CircleDollarSignIcon},
    {title:"Active Shows", value:dummyDashboardData.activeShows.length|| "0",icon:PlayCircleIcon},
    {title:"Total Users", value:dashboardData.totalUser|| "0",icon:UsersIcon},
  ]


 
  useEffect(()=>{
     console.log("in useEffect");
     dispatch(fetchDashboardData());
  },[]);



  
  

  return !loading?(
    <div >
        <Title text1={"Admin"} text2={"Dashboard"}/>
        <div className="relative flex flex-wrap gap-4 py-4  mb-5 w-full">
          
         <BlurCircle top="-50px" left="0"/>

         {
          dashboardCards.map((card,index)=>(

                <div key={index} className=" flex items-center justify-between py-3 px-4 max-w-50 w-full border border-primary/20 rounded-md bg-primary/10 ">


                    <div>
                      <p className='text-sm mb-1'>{card.title} </p>
                      <p className='font-semibold text-xl'>{card.value}</p>
                    </div>

                    <card.icon strokeWidth={2} className='size-6'/>
                    
                 </div>
          ))
         }
            
         </div>


          <h1 className='text-lg font-medium'>Active Shows</h1>
         
            <div className='relative flex flex-wrap gap-6 mt-5 max-w-5xl '>
                    <BlurCircle top="100px" left="-10%"/>
         
                   {dashboardData.activeShows && dashboardData.activeShows.map((show)=>(
               
                     <div key={show._id} className="w-55 h-full bg-primary/10 border border-primary/20 rounded-lg overflow-hidden hover:-translate-y-1 transition-transform duration-300">
         
                       <img src={show.movie.poster_path} alt="" className='w-full  h-60  object-cover ' />
         
         
         
                       <div className=" flex flex-col gap-2 p-3 ">
                           <p className='font-medium truncate'>{show.movie.title}</p>
         
                       
                           <div className='flex items-center justify-between'>
                               <p className='text-lg font-medium'>{currency} {show.showPrice}</p>
                               
                               <div className='flex items-center justify-center gap-1 text-sm'><StarIcon className='size-4 fill-primary text-primary'/>{show.movie.vote_average.toFixed(1)}</div>
                           </div> 
         
                           <p className='text-gray-400 text-sm'>{ dateTimeFormat(show.showDateTime)}</p>
                       </div>
                      
                     </div>
         
         
                   ))}
                   
            </div>
        
    </div>
  ):<Loader/>
}

export default Dashboard2