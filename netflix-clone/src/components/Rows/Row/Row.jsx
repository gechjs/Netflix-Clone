import React, { useEffect, useState } from "react";
import "./css/row.css";
import instance from "../../../utils/axios";
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';


const Row = ({ fetchUrl, title,isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const imgBaseUrl = "https://image.tmdb.org/t/p/original";
 const [trailerUrl, setTrailerUrl] = useState('')

  useEffect(() => {
    const fetchMovie = async () => {
      try {
       const response = await instance.get(fetchUrl);
        console.log(response);
        setMovies(response.data.results);

      } catch (error) {
        console.log(error);
      }
    };
    fetchMovie();
  }, [fetchUrl]);

  const handleClick = (movie)=>{
    if(trailerUrl){
        setTrailerUrl('')
    }
    else{
        movieTrailer(movie?.name || movie?.title || movie?.original_name)
        .then((url)=>{
            console.log(url)
            const urlParams = new URLSearchParams(new URL(url).search)
            console.log(urlParams)
            setTrailerUrl(urlParams.get('v'))
        })
    }
  }

  const opts = {
    width: '100%',
    height: '390',
    playerVars: {
      autoplay: 1
    }
  }

  return (
    <div className="row">
        <h1>{title}</h1>
        <div className="row_posters">
            {
                movies.map((movie, index)=>(
                    <img key={index} onClick={()=> handleClick(movie)} src={`${imgBaseUrl}${isLargeRow? movie.poster_path: movie.backdrop_path}`} className={`row_poster ${isLargeRow && 'row_posterLarge'}`} alt={movie.name} />
                ))
            }
        </div>
        <div style={{padding: '40px'}}>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    </div>
  )
};

export default Row;
