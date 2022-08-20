import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});

  const getMovie = async (movieId) => {
    try {
      const res = await axios.get(`http://localhost:8080/movie/${movieId}`);
      setMovie(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    if (!movie.title) {
      getMovie(params.id);
    }
  });
  return (
    <div>
      <h1>{movie.title}</h1>
    </div>
  );
};

export default MovieDetails;
