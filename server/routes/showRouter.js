import express from 'express'
import { getNowPlayingMovies } from '../controllers/showController.js';

const showRouter = express.Router();


showRouter.get('/now-playing',getNowPlayingMovies)  // this getNowPlaying func takes req,res as params ...response recieved at other end route


export default showRouter;