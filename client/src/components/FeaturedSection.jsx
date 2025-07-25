import { ArrowRight } from 'lucide-react'
import MovieCard from './MovieCard'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import { dummyShowsData } from '../assets/assets'
const FeaturedSection = () => {

    const navigate=useNavigate();

  return (
    <div className=' xl:px-44 lg:px-24 md:px-16 px-6  overflow-hidden'>

        <div className=' relative flex justify-between items-center pt-20 pb-10 '>
            <BlurCircle top='0' right='-80px'/>
            <p className='text-gray-300 font-medium text-lg'>Now Showing</p>

            <button className='group flex items-center justify-center text-sm gap-2 text-gray-300 cursor-pointer' onClick={()=>navigate("/movies")}>
                View All <ArrowRight className='size-4.5 group-hover:translate-x-0.5 transition duration-150'/>
            </button>
        </div>
       

        <div className='flex flex-wrap gap-8 mt-8 max-sm:justify-center  '>
           
           {dummyShowsData.slice(0,6).map((movie)=>

           <MovieCard key={movie._id} movie={movie}/>    )}

         
        </div>


         <div className='flex justify-center items-center mt-20'>
               <button className='bg-primary px-10 py-3 hover:bg-primary-dull rounded-md transition text-sm font-medium  cursor-pointer' onClick={()=>{ navigate('/movies'); scrollTo(0,0); }}>show more</button>
         </div>
    
    </div>
  )
}

export default FeaturedSection