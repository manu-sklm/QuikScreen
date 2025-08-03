import { clerkClient } from "@clerk/express";


export const protectAdmin=async(req,res,next)=>{
    try{

                const {userId}=req.auth();
                console.log("at middleware ",userId)
                const user=await clerkClient.users.getUser(userId);
             
                
                if(user.privateMetadata.role!='admin')
                {
                         return res.json({success:false,isAdmin:false, message:"not authorized "})
                }

                next();
       
    }catch(error)
    {    //updated json data..added isAdmin:false here to
           console.log("at catch")
          return res.json({success:false,isAdmin:false, message:error.message})
    }
}