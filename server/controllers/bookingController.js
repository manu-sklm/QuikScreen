import { inngest } from "../inngest/index.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js"
import stripe from "stripe"
//Function to check the availability of seats


const checkSeatsAvailability= async (showId,selectedSeats)=>
{
       try{

        const showData=await Show.findById(showId);
        if(!showData) return false;

        const occupiedSeats=showData.occupiedSeats;
        
        //isAnySeatTaken= selectedSeats.some(seat=>occupiedSeats.includes(seat))
       const    isAnySeatTaken= selectedSeats.some(seat=>occupiedSeats[seat]);
        

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



        //Stripe Gateway Intialize -here  `

        const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);
        

        const line_items=[{
            price_data:{
              currency:'usd',
              product_data:{
                name:showData.movie.title
              },
              unit_amount:Math.floor(booking.amount)*100
            },
            quantity:1
        }]

       


        const session=await stripeInstance.checkout.sessions.create({
          success_url:`${origin}/loading/my-bookings`,
          cancel_url:`${origin}/my-bookings`,
          line_items:line_items,
          mode:'payment',
          metadata:{
            bookingId:booking._id.toString()
          },
          expires_at:Math.floor(Date.now()/1000)+30*60, //expires in 30 mins

        })

          console.log("session created with url",session.url);

              
                        booking.paymentLink = session.url;

                        await booking.save();

                      //run inngest sheduler fun to check payment status after 10 mins
                      
                      await inngest.send({
                        name:'app/checkpayment',
                        data:{
                          bookingId:booking._id.toString()
                        }
                      })
                  
                      res.json({success:true,url:session.url});


    }catch(error)
    {
        console.log("entered catch");

        console.error(error);
        res.json({success:false,message:error.message});

    }

}



export const getOccupiedSeats = async(req,res)=>{
    try{
        
        const {showId}=req.params;
              const showData= await Show.findById(showId)

              console.log("at getOccSts",showData.occupiedSeats);

              const occupiedSeats= Object.keys(showData.occupiedSeats)
              

              res.json({success:true,occupiedSeats})
       
    }catch(error)
    {
        
        console.error(error);
        res.json({success:false,message:error.message});
    }
}