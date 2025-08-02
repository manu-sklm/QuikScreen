

// Api Controller function to get User Bookings

import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js"
import Movie from "../models/Movie.js";

export const getUserBookings=async(req,res)=>{

      try{
          const user=req.auth().userId;
          const userBookings=await Booking.find({user}).populate({
            path:'show',
            populate:{path:'movie'}

          }).sort({createdAt:-1})

        res.json({success:true,userBookings});

        }catch(error)
        {
            console.error(error);
            res.json({success:false,messsage:error.messsage});
        }
} 



// Api Controller Funtion to Update favorite movie in clerk User Metadata

export const updateFavorite=async(req,res)=>{

    try{

        const {movieId}=req.body;
        const userId=req.auth().userId;

        const user=await clerkClient.users.getUser(userId)
        let favorites = user.privateMetadata.favorites || [];
     
        let msg='';
          // Toggle favorite
        if (!favorites.includes(movieId)) {
           favorites.push(movieId);
           msg="Favorite Added successfully !"
        } else {

        favorites = favorites.filter(item => item !== movieId);
           msg="Favorite Removed successfully !"
        }
         
        // Update Clerk metadata
        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
                ...user.privateMetadata,
                favorites
            }
        });
       
        //updated to return favorite movies after updating(Adding/removing) fav movies
    
           // Get full movie docs from DB
         const movies = await Movie.find({ _id: { $in: favorites } });




        res.json({success:true,movies,message:msg})

    }catch(error){
           console.error(error);
           res.json({success:false,messsage:error.messsage});
    }
}


//Api get list of favorites
export const getFavorites=async(req,res)=>{
    try{
        const user=await clerkClient.users.getUser(req.auth().userId);
        const favorites= user.privateMetadata.favorites;

        //get movies from database
        const movies=await Movie.find({_id:{$in:favorites}});

        res.json({success:true,movies});

    }catch(error){
           console.error(error);
           res.json({success:false,messsage:error.messsage});
    }
}