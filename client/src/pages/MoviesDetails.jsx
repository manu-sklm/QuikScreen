import { ArrowBigLeft, ChevronLeft,ChevronRight, FeatherIcon, HeartIcon, MoveDiagonal, MoveLeft, MoveLeftIcon, MoveRightIcon, PlayCircleIcon, StarIcon } from 'lucide-react'

import { useState ,useEffect,useRef } from 'react'
import timeFormat from '../../lib/timeFormat'
import BlurCircle from '../components/BlurCircle'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import { useNavigate, useParams } from 'react-router-dom'

import Loader from '../components/Loader'
import { fetchSingleShow } from '../redux/showSlice'
import {useSelector,useDispatch} from 'react-redux'
import { image_base_url } from '../config/constants'
import {  updateFavorites } from '../redux/userSlice'
import toast from 'react-hot-toast'
const MoviesDetails = () => {

  const {id}=useParams();
  const {show,loading,error,shows}=useSelector((state)=>state.show);
  const {user}=useSelector((state)=>state.auth);
  const {favorites}=useSelector((state)=>state.user);

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const scrollRef = useRef(null);
  
 

  const scrollToDateSection=()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"});
  };



  const handleFavorite=async ()=>{
       if(user)
       {
           dispatch(updateFavorites(id))
                        .unwrap()
                        .then((res)=>{
                       
                          // dispatch(fetchFavorites()); // do we need to dispatch it to update it cz the heard styling depends on it ? yes. but we modified making no need
                          toast.success(res.message);
                        })
                        .catch((error)=>{
                          toast.error("unsuccessfull..",error);
                        })

       }
  }





  useEffect(()=>{
    
  if(user)
  dispatch(fetchSingleShow(id));

  },[id,user])

  if (loading) return <Loader />;
  if (!show || !show.movie) return null;

  // don't we  just "show" tp check ex: return show ? () ..because empty {} is truthy
  return     (
    <div>
      <div className=' px-6 xl:px-44 lg:px-24  md:px-16 pt-50 min-h-[80vh] overflow-hidden'>
          

            {/* Movie details */}
            <div className='flex flex-col md:flex-row gap-8 mb-5'>
              <img src={image_base_url+show.movie.poster_path} alt="" className='h-104 max-w-70 object-cover rounded-xl' />
              <div className='space-y-4 relative'>
                <BlurCircle top="-50px" left="-150px" />
                <p className='text-primary text-md'>ENGLISH</p>
                <h2 className='text-4xl font-bold'>{show.movie.title}</h2>

                <div className='flex items-center gap-2'>
                  <StarIcon className='size-4 fill-primary text-primary'/> {show.movie.vote_average.toFixed(1)} User Rating
                </div>

                <p className='text-sm text-gray-400'>{show.movie.overview}</p>
                <p className='text-sm  mt-2 '>{new Date(show.movie.release_date).getFullYear()} * {show.movie.genres.slice(0,2).map( genre=>genre.name).join(" | ") } * {timeFormat(show.movie.runtime)}</p>

               {/* Buttons */}
                <div className='flex items-center justify-start gap-5 text-sm font-medium mt-7'>
                  <button className='bg-gray-800 hover:bg-gray-900 transition px-7 py-3 rounded-md flex items-center gap-2 cursor-pointer active:scale-95'> <PlayCircleIcon className='size-4.5'/> Watch Later</button>
                  <button onClick={scrollToDateSection} className='bg-primary hover:bg-primary-dull transition px-9 py-3 rounded-md cursor-pointer active:scale-95'>Buy Tickets</button>
                  {/* <a href="#dateSection" className='bg-primary hover:bg-primary-dull transition px-9 py-3 rounded-md cursor-pointer active:scale-95'>Buy Tickets</a> */}

                  <div onClick={handleFavorite} className='rounded-full bg-gray-800 p-3'><HeartIcon className={`size-5 ${favorites.find((movie)=>movie._id===id)? 'fill-primary text-primary':''}`}/></div>
                </div>

              </div>
            </div>
            
            {/* Cast */}
            <h2 className='text-gray-300 font-medium text-lg mt-20 '>Whole cast</h2>

            <div className='overflow-x-auto mt-8 pb-4 no-scrollbar ' >
               <div className=' flex gap-5 items-center  w-max px-4'>
              {
                show.movie.casts.slice(0,12).map((cast,index)=>(
                  <div key={index} className='flex flex-col items-center text-center  '>

                    <img src={image_base_url+cast.profile_path} alt="profileImage" className='aspect-square  rounded-full size-20 object-center object-cover'/>
                    <p className=' font-medium text-xs mt-3' >{cast.name}</p>

                  </div>

                ))
              }
               </div>
            </div>

           {/* Date window  */}

           
                   
              
                
            {/* my modified version , flex instead grid etc0e98 */}
            <DateSelect dateTime={show.dateTime} id={id} ref={scrollRef} />
            
            <p className=' text-lg  font-medium mt-20 mb-8'>You May Also Like</p>
            <div className=' relative flex flex-wrap max-sm:justify-center  gap-8  '>
             <BlurCircle top='200px' right='200px'/>
                  {shows.slice(0,6).map((movie)=>

                  <MovieCard key={movie._id} movie={movie}/>    )}
                
            </div>
               
            <div className='flex justify-center items-center mt-20'>
                <button className='bg-primary px-10 py-3 hover:bg-primary-dull rounded-md transition text-sm font-medium  cursor-pointer' onClick={()=>{ navigate('/movies'); scrollTo(0,0); }}>Show more</button>
            </div>
       

            
      </div>
    </div>
  )
}

export default MoviesDetails