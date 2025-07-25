import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const HeroSection = () => {
    const navigate=useNavigate();
  return (
     <div className='h-screen w-full bg-cover bg-[url(/backgroundImage.png)] bg-center flex flex-col items-start justify-center gap-4 lg:px-37 px-6 md:px-16 '>
            <img src={assets.marvelLogo} alt="" className='w-50 max-h-11 lg:h-11 mt-20' />
            <h1 className='text-5xl md:text-[70px] font-semibold md:leading-18 max-w-110'>Guardians  <br />of the Galaxy</h1>

         <div className='flex justify-center items-center text-gray-300'>
            <p>Action | Adventure | Sci-Fi  </p>

            <div className='flex  items-center gap-1 px-3'>
                <CalendarIcon className='size-4.5'/>  2018
            </div>
             <div className='flex  items-center gap-1 '>
                <ClockIcon className='size-4.5'/> 2h 8m
            </div>
         </div>
            
        <p className='max-w-[450px]  text-gray-300'>In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.</p>
        <button onClick={()=>navigate('/movies')} className='py-3 px-6 font-medium text-sm text-gray-300 rounded-full bg-primary hover:bg-primary-dull transition   flex justify-center items-center gap-2 cursor-pointer'> Explore Movies <ArrowRight className='size-4.5'/> </button>
    </div>
  )
}

export default HeroSection