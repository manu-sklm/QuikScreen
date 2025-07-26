import Booking from "../models/Booking.js";
import Show from "../models/Show.js"

//Function to check the availability of seats


const checkSeatsAvailability= async (showId,selectedSeats)=>
{
       try{

        const showData=await Show.findById(showId);
        if(!showData) return false;

        const occupiedSeats=showData.occupiedSeats;
        
        //isAnySeatTaken= selectedSeats.some(seat=>occupiedSeats.includes(seat))
        isAnySeatTaken= selectedSeats.some(seat=>occupiedSeats[seat]);
        

        return !isAnySeatTaken;
       }catch(error)
       {
        console.error(error.message);
        return false;

       }
}



export const createBooking =async(req,res)=>
{

    try{
          const{userId}=req.auth();
          const {showId,selectedSeats}=req.body;
          const {origin}=req.headers;

          const isAvailable=await checkSeatsAvailability(showId,selectedSeats);

          if(!isAvailable)
          {
          return res.json({sucess:false, message:'Selected seats are not available'})
          }

          //get the show details

          const showData= await Show.findById(showId).populate('movie');
          //create a booking
          const booking=await Booking.create({
            user:userId,
            show:showId,
            amount:showData.showPrice*selectedSeats.length,
            bookedSeats:selectedSeats
          })


          selectedSeats.map((seat)=>{
            showData.occupiedSeats[seat]=userId;
          })
        // It is a Mongoose Document instance — an object created by Mongoose that wraps your MongoDB data and adds many helper methods and features.
          showData.markModified('occupiedSeats');
          await showData.save();
           
          res.json({succes:true,message:"Booking successful !"});


        //Stripe Gateway Intialize -here  
    }catch(error)
    {

        console.error(error);
        res.json({succes:false,message:error.message});

    }

}



export const getOccupiedSeats = async(req,res)=>{
    try{

        const {showId}=req.params;
              const showData= await Show.findById(showId)

              const occupiedSeats= Object.keys(showData.occupiedSeats)

              res.json({succes:true,occupiedSeats})

    }catch(error)
    {
        
        console.error(error);
        res.json({succes:false,message:error.message});
    }
}