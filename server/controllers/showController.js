
import axios from 'axios'
import Movie from '../models/Movie.js'
import Show from '../models/Show.js';


export const getNowPlayingMovies = async (req,res)=>{


    try{


            const {data}=await axios.get('https://api.themoviedb.org/3/movie/now_playing',{
                headers:{Authorization:`Bearer ${process.env.TMDB_API_KEY}`}
            })

            const movies=data.results;

            console.log("nowPlaying controller called..!");

            res.json({success:true,movies:movies})
    }catch(error)
    {
       
        res.json({success:false,message:error.message})

    }
}

 export const addShow=async(req,res)=>{

    try{
            const { movieId,showInput,showPrice } =req.body;

            let movie=await Movie.findById(movieId)
            console.log("add showcontroller called");
            console.log(movieId,showInput,showPrice);

    


            if(!movie){
                //Fetch movie details and credits from TMDB API

                console.log("no movie found in db");
                 const [movieDetailsResponse,movieCreditsResponse]=await Promise.all([

                                axios.get(`https://api.themoviedb.org/3/movie/${movieId}`,{
                                     headers:{Authorization:`Bearer ${process.env.TMDB_API_KEY}`}}),
                                
                                axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`,{
                                headers:{Authorization:`Bearer ${process.env.TMDB_API_KEY}`}})
           
                             ]);

                 
                const movieApiData=movieDetailsResponse.data;
                const movieCreditsData=movieCreditsResponse.data;


                 
                const movieDetails={
                    _id:movieId,
                    title:movieApiData.title,
                    overview:movieApiData.overview,
                    poster_path:movieApiData.poster_path,
                    backdrop_path:movieApiData.backdrop_path,
                    genres:movieApiData.genres,
                    casts:movieCreditsData.cast,
                    release_date:movieApiData.release_date,
                    original_language:movieApiData.original_langauge,
                    tagline:movieApiData.tagline || "",
                    vote_average:movieApiData.vote_average,
                    runtime:movieApiData.runtime

                }

                //add movie to database
                movie=await Movie.create(movieDetails);

             
                    
            }

            const showsToCreate=[];



            /// if we used flat map in frontend while sending payload....then:show.time.forEach(...)

            showInput.forEach((show)=>{
                const showDate=show.date;

                show.time.forEach((time)=>{
                    const dateTimeString=`${showDate}T${time}`;

                    showsToCreate.push({
                        movie:movieId,
                        showDateTime:new Date(dateTimeString),
                        showPrice,
                        occupiedSeats:{}
                    })
                })

            });

            if(showsToCreate.length>0){
                await Show.insertMany(showsToCreate);
            }

            res.json({success:true,message:"Show Added successfully"});
    }catch(error)
    {

        console.error(error);
        res.json({success:false,message:error.message});


    }
}

//Api to get the list of shows

export const getShows=async (req,res,)=>{
 

    try{    

        const shows=await Show.find({showDateTime:{$gte:new Date()}}).populate('movie').sort({showDateTime:1}) //1 means -ascending order
        const uniqueShows=new Set(shows.map(show=>show.movie))
      
        res.json({success:true,shows:Array.from(uniqueShows)})
           
    } catch(error)
    {
        console.error(error);
        res.json({success:false,message:error.message});

    }   
    



}


//Api to get a single show from the db

export const getShow=async (req,res)=>{
    try{
        const {movieId}=req.params;
        const shows=await Show.find({movie:movieId,showDateTime:{$gte:new Date()}})

        const movie =await Movie.findById(movieId);

        const dateTime={};
       
        shows.forEach((show)=>{
            const date= show.showDateTime.toISOString().split("T")[0];

            if(!dateTime[date])
            {
                dateTime[date]=[]
            }

            dateTime[date].push({time:show.showDateTime,showId:show._id})
        })
       res.json({success:true,movie,dateTime})    
    }
    catch(error)
    {
        console.error(error);
        res.json({success:false,message:error.message});
    }
}