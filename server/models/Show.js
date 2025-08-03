import mongoose from "mongoose";

const showSchema=new mongoose.Schema(
    {   //i changed the type to string to i object
        movie:{type:String,required:true,ref:'Movie'},
        showDateTime:{type:Date,required:true},
        showPrice:{type:Number,required:true},
        occupiedSeats:{type:Object,default:{}}
    },{minimize:false}
)


const Show =mongoose.model('Show',showSchema);

export default Show;