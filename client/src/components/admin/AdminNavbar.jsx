import React from 'react'
import { assets } from '../../assets/assets'
import BlurCircle from '../BlurCircle'
import { Link } from 'react-router-dom'
const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between w-full px-6 md:px-10 h-16  border-b border-b-gray-300/30">
      <Link to='/'> <img src={assets.logo} alt=""  className='w-36 h-auto'/></Link>  
        
    </div>
  )
}

export default AdminNavbar