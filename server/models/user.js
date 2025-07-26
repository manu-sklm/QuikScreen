import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id:{ type: String,required: true},
     name:{ type: String,required: true},    
     email:{ type: String,required: true},    
     image:{ type: String, required: true},

});

// ✅ only create if not already created  
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;