import React from 'react'
import { CheckIcon, StarIcon } from 'lucide-react'
import voteFormat from '../../../lib/voteFormat'
const ShowCard = ({show,selectedMovie,setSelectedMovie}) => {


  
  //added toggle select
  const selectingMovie=()=>{

     setSelectedMovie((prev)=>{
     if(prev==show.id)
     {
      console.log("removed",show.id);
        return null;
     }
     console.log("selected",show.id);
     return show.id;
     })
  }

  return (
   
    <div className='group-hover:not-hover:opacity-40 transition duration-300 hover:-translate-y-1 hover:brightness-100 cursor-pointer'>
        <div  className='relative w-40 rounded-lg  overflow-hidden ' onClick={selectingMovie}>
            <img src={show.poster_path} alt='' className='h-full w-full object-cover  brightness-90 '/>
            <div className='absolute bottom-0 w-full flex justify-between items-center px-1 py-2 bg-black/60 rounded-b-lg text-sm'>
                          <div className='flex items-center justify-center gap-1 text-sm text-gray-400'><StarIcon className='size-4 fill-primary text-primary'/>{show.vote_average.toFixed(1)}</div>
                          <p >{voteFormat(show.vote_count)} votes</p>
            </div>

            {selectedMovie===show.id&&
             <div  className='absolute top-2 right-2 bg-primary border-none rounded-sm p-1'>

               <CheckIcon className='size-4' />
             </div>
             }
          
        </div>

        <div className='mt-1 w-40 '>
              <p className='font-medium truncate'>{show.title}</p>
              <p className='text-gray-400'>{show.release_date}</p>
        </div>
    </div>
    

     
  
  )
}

export default ShowCard