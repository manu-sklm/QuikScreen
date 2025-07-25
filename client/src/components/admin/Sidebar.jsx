import React from 'react'
import { assets } from '../../assets/assets'
import {NavLink} from 'react-router-dom'
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
const Sidebar = () => {

  const user={
    name:'Admin',
    lastName:'User',
    imageUrl:assets.profile,
  }

 const adminNavLinks=[
  { name:'Dashboard' , path:'/admin'  ,icon:LayoutDashboardIcon },
  { name:'Add Shows' , path:'/admin/add-shows'  ,icon:PlusSquareIcon },
  { name:'List Shows' , path:'/admin/list-shows'  ,icon:ListIcon },
  { name:'List Bookings' , path:'/admin/list-bookings'  ,icon:ListCollapseIcon },


 ]

  return (
    <div className='h-[calc(100vh-64px)] md:flex flex-col items-center text-sm pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/30 min-h-[90vh]'>

     
        <div className='flex flex-col gap-2 items-center justify-center'>
           <img src={assets.profile} alt="" className='aspect-square rounded-full size-9 md:size-14 '/>
           <h1 className=' text-base text-white max-md:hidden'>{user.name} {user.lastName}</h1>
        </div> 

       

      <div className='w-full'>


         {adminNavLinks.map((link,index)=>( 
          <NavLink key={index} end to={link.path} className={  ({isActive})=> ` relative flex gap-2 w-full  min-md:pl-10  py-2.5 first:mt-6  items-center max-md:justify-center text-gray-400 transition transition-duration-500 ${isActive && "text-primary bg-primary/15 " }` }>
              
               {({isActive})=>(
                <>
                <link.icon className='size-5'/>
                  <p className='max-md:hidden'>{link.name}</p>
                  <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive&& "bg-primary"}`}/>

                </>
               )
                
               }
             
               
               
          </NavLink>
         ))}
      </div>

    
    </div>
  )
}

export default Sidebar