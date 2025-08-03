import express from 'express'
import { requireAuth } from '@clerk/express';
import { getFavorites, getUserBookings, updateFavorite } from '../controllers/userController.js';

const userRouter=express.Router();



userRouter.get('/bookings',requireAuth(),getUserBookings);
userRouter.get('/favorites',getFavorites);
userRouter.post('/update-favorite',updateFavorite);



export default userRouter;