import React from 'react'

import { dummyShowsData } from '../assets/assets'
import BlurCircle from "../components/BlurCircle"
import MovieCard from "../components/MovieCard"


const Movies = () => {

  return  dummyShowsData.length>0 ?(
    <div className=' px-6 xl:px-44 lg:px-24  md:px-16 my-20 py-20 min-h-[80vh] overflow-hidden'>


      

            
            

        <h2 className='text-gray-300 font-medium text-lg mt-4 '>Now Showing</h2>
      
        <div className='flex flex-wrap max-sm:justify-center gap-8 mt-5 relative '>
          
          <BlurCircle top='50px' left='-140px'/>
          <BlurCircle bottom='0' right='-80px'/>
           
           {dummyShowsData.slice(0,6).map((movie)=>

           <MovieCard key={movie._id} movie={movie}/>    )}
        </div>

    </div>
  ) :( 
    <div className='min-h-screen w-full flex justify-center items-center'>
       <h2 className='text-3xl font-bold text-center'> No Movies Available</h2>
    </div>
   
  )
}


export default Movies;