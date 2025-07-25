import express from 'express'
import { addShow, getNowPlayingMovies } from '../controllers/showController.js';

const showRouter = express.Router();


showRouter.get('/now-playing',getNowPlayingMovies)  // this getNowPlaying func takes req,res as params ...response recieved at other end route

showRouter.post('/add',addShow) 
export default showRouter;