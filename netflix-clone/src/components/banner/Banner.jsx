import React, { useEffect, useState } from "react";
import instance from "../../utils/axios";
import requests from "../../utils/request";
import "./css/banner.css";

const Banner = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await instance.get(requests.fetchNetflixOriginals);
        console.log(response.data.results);
        const randomMovie =
          response.data.results[
            Math.floor(Math.random() * response.data.results.length)
          ];
        console.log(randomMovie); 
        setMovie(randomMovie);
      } catch (error) {
        console.log(error);
      }
    };

    getMovie();
  }, []);

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center top",
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
        <h1 className="banner_description">
          {(movie?.overview)?.length > 150
            ? movie?.overview.slice(0, 150) + "..."
            : movie?.overview}
        </h1>
      </div>
      <div className="banner_fadeBottom" />
    </div>
  );
};

export default Banner;
