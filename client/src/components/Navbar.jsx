import React from 'react'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import {MenuIcon, SearchIcon, TicketCheck, TicketIcon, TicketPlus, User, XIcon} from "lucide-react"

import {UserButton, useClerk,useUser} from '@clerk/clerk-react'
const Navbar = () => {

  const [isOpen,setisOpen]=useState();
  const navigate=useNavigate();
  const {user} =useUser();
  const {openSignIn}=useClerk();
  return (
    <div className='fixed top-0 left-0   z-50 flex justify-between items-center w-full px-6 md:px-16 lg:px-36 py-5'>



        <Link className='max-md:flex-1' to="/"><img src={assets.logo} alt="" className='w-36 h-auto ' /></Link>


        <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium  max-md:text-lg z-50 flex flex-row  max-md:items-center  max-md:flex-col justify-center gap-8 md:px-8 py-3 max-md:h-screen md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-200/20 overflow-hidden  transition-[width] duration-500 ${isOpen? 'max-md:w-full': 'max-md:w-0'}` }>
          
          <XIcon className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer" onClick={ ()=>setisOpen(!isOpen)}/>
          <Link onClick={()=>{scrollTo(0,0); setisOpen(false)}} to="/" >Home</Link>
          <Link onClick={()=>{scrollTo(0,0); setisOpen(false)}} to="/movies">Movies</Link>
          <Link onClick={()=>{scrollTo(0,0); setisOpen(false)}} to="/theaters">Theaters</Link>
          <Link onClick={()=>{scrollTo(0,0); setisOpen(false)}} to="/releases">Releases</Link>
          <Link onClick={()=>{scrollTo(0,0); setisOpen(false)}} to="/favorites">Favorite</Link>

        </div>

        <div className='flex items-center gap-8'>
          <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer'/>

           { 
            !user ? (
              <button onClick={openSignIn} className='py-1 px-4 bg-primary sm:py-2 hover:bg-primary-dull transition  rounded-full font-medium cursor-pointer'>Login</button>
            ): (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action label='My Bookings' labelIcon={<TicketCheck width={15}/>} onClick={()=>navigate('/my-bookings')}/>
                </UserButton.MenuItems>
              </UserButton>
            ) 
          }

          
        </div>

        <MenuIcon className='md:hidden max-md:ml-4 w-8 h-8 cursor-pointer' onClick={()=>{setisOpen(!isOpen)}}/>
    </div>
  )
}

export default Navbar