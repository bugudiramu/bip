import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const relative_path = 'https://image.tmdb.org/t/p/original';

  const [movie, setMovie] = useState({});
  const params = useParams();

  useEffect(async () => {
    const url = `https://movie-task.vercel.app/api/movie?movieId=${params.id}`;
    let response = await axios.get(url);
    setMovie(response.data.data);
  }, []);
  return (
    <div className='movie_detail_container d-flex flex-column justify-content-center'>
      <img
        width={700}
        height={500}
        src={`${relative_path}${movie.backdrop_path}`}
        loading='lazy'
      />
      <div className='movie_detail d-flex flex-column justify-content-start'>
        <h4>{movie.title}</h4>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
