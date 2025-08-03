

// Api to check if user or not

import Booking from "../models/Booking.js";
import Show from '../models/Show.js'
import User from '../models/User.js'


export const isAdmin=async(req,res)=>{
    res.json({success:true,isAdmin:true})     //the reason why we aren't checking admin or not here is, already middle protcedAdmin is added, if that passed then user is admin
}


export const getDashboardData=async(req,res)=>{
     
    try{
            const bookings= await Booking.find({isPaid:true});
            const activeShows=await Show.find({showDateTime:{$gte:new Date()}}).populate('movie');
            const totalUser=await User.countDocuments();

            
          
  
            const dashboardData={
                totalBookings:bookings.length,
                totalRevenue:bookings.reduce((acc , booking)=>acc+booking.amount,0),
                activeShows,
                totalUser
            }

            res.json({success:true,dashboardData})
    }catch(error)
    {
        console.error(error);
        res.json({success:false,messsage:error.messsage});
    }
}

//Api to get all shows
export const getAllShows=async(req,res)=>{

          try{

            const shows=await Show.find({showDateTime:{$gte:new Date()}}).populate('movie').sort({showDateTime:1});
           
            
            res.json({success:true,shows});

            
        }catch(error)
        {
            console.error(error);
            res.json({success:false,messsage:error.messsage});
        }
}

//Api to get all bookings


export const getAllBookings=async(req,res)=>
{
  
    
          try{

            const bookings=await Booking.find({isPaid:true}).populate('user').populate(
                {
                    path:'show',
                    populate:{path:'movie'}
                }).sort({createdAt:-1}); //sorts based on timestap in descending order

                res.json({success:true,bookings});

            
        }catch(error)
        {
            console.error(error);
            res.json({success:false,messsage:error.messsage});
        }
    
}