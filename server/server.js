import express from 'express';

import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from './routes/showRouter.js';

const app=express();
const port=3000;
await connectDB();    
//middle wares

app.use(express.json());    //json text/data to js object 
app.use(cors());
app.use(clerkMiddleware())



// Routes
app.get('/',(req,res)=>{
    res.send('server is Live..!');
})


// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use('/api/inngest', serve({ client: inngest, functions }));

//instead having multiple routes with same base url(/api/show) like /api/show/now-playing ,api/show/something etc all in this server file...
// we created a separate Router that routes And Handles all requests that starts with base url..
app.use('/api/show',showRouter); 

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);
})