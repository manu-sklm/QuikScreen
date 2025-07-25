import mongoose from "mongoose";

const showSchema=new mongoose.Schema(
    {
        movie:{type:String,required:true,ref:'Movie'}
    }
)