import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  // const handleClick = (movie) => {
  //   if (trailerUrl) {
  //     setTrailerUrl("");
  //   } else {
  //     movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
  //       .then((url) => {
  //         if(url){
  //           console.log(url);
  //         }
  //         const urlParams = new URLSearchParams(new URL(url).search);
  //         setTrailerUrl(urlParams.get('v'));
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let searchTerm = movie?.name || movie?.title || movie?.original_name || "";
      movieTrailer(searchTerm)
        .then((url) => {
          if (url) {
            // Log the URL to verify its format
            console.log("Found trailer URL:", url);
  
            // Extract video ID from URL
            const urlParams = new URLSearchParams(new URL(url).search);
            const videoId = urlParams.get('v');
  
            if (videoId) {
              setTrailerUrl(videoId);
            } else {
              console.error("Failed to extract video ID from trailer URL:", url);
            }
          } else {
            console.error("No trailer found for:", searchTerm);
            // Optionally provide feedback to the user
          }
        })
        .catch((error) => {
          console.error("Error fetching trailer:", error);
          // Handle error gracefully, e.g., show a message to the user
        });
    }
  };
  

  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className={`row__posters ${isLargeRow && "row__posterLarge"}`}>
        {/* posters */}

        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className='row__poster'
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;