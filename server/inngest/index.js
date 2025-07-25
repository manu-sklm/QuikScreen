import { Inngest } from "inngest";
import User from '../config/models/user.js';

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });


// Inngest function to save user data to a database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },

  async ({ event}) => {
    const {id,first_name,last_name,email_addresses,image_url}=event.data;
    const userData={
       _id:id,
       email:email_addresses[0].email_addresses,
       name:first_name+' '+last_name,
       image:image_url
    }
    console.log("User Data inserted")
    await User.create(userData);
    
  },
);


// Inngest function to update user data from a database

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },

  async ({ event}) => {
    const {id,first_name,last_name,email_addresses,image_url}=event.data;
    const userData={
       _id:id,
       email:email_addresses[0].email_addresses,
       name:first_name+' '+last_name,
       image:image_url
    }
    console.log("User Data Updated")
    await User.findByIdAndUpdate(userData);
    
  }
);
// Inngest function to delete user data from a database

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },

  async ({ event}) => {
   
    console.log("User  deleted")
    await User.findByIdAndDelete(event.data.id);
    
  },
);




// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation,syncUserDeletion,syncUserUpdation];