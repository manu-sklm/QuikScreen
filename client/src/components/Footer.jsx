import React from 'react'

import { assets } from '../assets/assets';
const Footer = () => {
  return (

    

 <footer className='px-6 md:px-16 lg:px-36 w-full text-gray-300 mt-40'>

      <div className='flex flex-col md:flex-row justify-between   w-full gap-10 border-b border-gray-500 pb-10'>

        <div className='md:max-w-96'>

           <img src={assets.logo} alt="logo" className='w-36 h-auto'/>

           <p className='text-sm mt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius dolor nostrum amet perferendis accusamus atque alias suscipit, quaerat voluptatibus labore rerum</p>

           <div className='flex items-center gap-6 mt-4'>
             <img src={assets.googlePlay} alt="playstore" className='h-9 w-auto ' />
             <img src={assets.appStore} alt="appstore" className='h-9 w-auto  '  />
           </div>
        </div>


        <div className='flex-1 flex items-start justify-between md:justify-end gap-20 md:gap-40'>
                <div >
                            
                    <h2 className='font-semibold  mb-5 '>Company</h2>
                    <div className='text-sm space-y-2 '>
                        <p>Home</p> 
                        <p>About us</p>
                        <p>Contact us</p>
                        <p>Privacy policy</p>

                    </div>
                    
                </div>

                <div className=''>
                    <h2 className='font-semibold   mb-5 '>Get in touch </h2>
                     <div className='text-sm space-y-2'>
                         <p>+91 7670890609</p> 
                         <p>manusklm74@gmail.com</p>
                     </div>
                </div>
             </div>
      </div>

      <p className='text-gray-300 text-sm text-center py-5'> Copyright {new Date().getFullYear()} © Myshow. All Right Reserved.</p>
</footer>
     

    )
}

  
    



export default Footer;