import React, { useEffect, useState } from "react";
import instance from "../../utils/axios";
import requests from "../../utils/request";
import './css/banner.css';

const Banner = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await instance.get(requests.fetchNetflixOriginals);
        console.log(response.data.results); // Log results to check the data
        const randomMovie = response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ];
        console.log(randomMovie); // Log the selected movie
        setMovie(randomMovie);
      } catch (error) {
        console.log(error);
      }
    };

    getMovie();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.slice(0, n - 1) + '...' : str;
  }

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <div className="banner_button play">Play</div>
          <div className="banner_button">My List</div>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview || '', 150)}</h1>
      </div>
      <div className="banner_fadeBottom" />
    </div>
  );
};

export default Banner;
