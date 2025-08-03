import express from 'express'
import { createBooking, getOccupiedSeats } from '../controllers/bookingController.js';
import { requireAuth } from '@clerk/express';
const bookingRouter=express.Router();

bookingRouter.post('/create',requireAuth(),createBooking);
bookingRouter.get('/seats/:showId',requireAuth(),getOccupiedSeats);


export default bookingRouter;