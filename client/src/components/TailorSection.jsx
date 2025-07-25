import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets';
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle';
import { PlayCircleIcon, PlayIcon } from 'lucide-react';
const TailorSection = () => {

    const [currentTrailor,setCurrentTrailor]=useState(dummyTrailers[0]);
  return (
    <div className='px-6 xl:px-44 lg:px-24  md:px-16 overflow-hidden '>

       
        <p className='mt-20 pb-10 text-lg text-gray-300'>Trailors</p>

        <div className='relative '>
            <BlurCircle top="-100px" right='-100px'/>
            <ReactPlayer url={currentTrailor.videoUrl} controls={false} width="960px" height="560px" className="mx-auto max-w-full"/>
        </div>

        <div className='group grid grid-cols-4 gap-4 mx-auto  max-w-3xl my-6 md:gap-8 '>
            {dummyTrailers.map((trailor)=>(
                <div className='relative 
                  group-hover:not-hover:opacity-50 hover:translate-y-1 duration-300
                  transition max-md:h-60 md:max-h-60 cursor-pointr
                ' onClick={()=>setCurrentTrailor(trailor)}>
                    <img src={trailor.image} alt="trailor" className=' rounded-lg width-full h-full object-cover brightness-75 '/>
                    <PlayCircleIcon  strokeWidth={1.6} className='absolute top-1/2 right-1/3 h-5 w-5 md:h-12 md:w-8 transform -translate-x-1/2 -translate-y-1/2'/>
                </div>
            ))}
      
        </div>
    </div>
  )
}

export default TailorSection