import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});

  const navigate = useNavigate();

  const getMovie = async (movieId) => {
    try {
      const res = await axios.get(`http://localhost:8080/movie/${movieId}`);
      if (!res.data) navigate("/error");
      setMovie(res.data);
    } catch (error) { navigate("/error") }
  };

  useEffect(() => {
    if (!movie.title) {
      getMovie(params.id);
    }
  });

  return (
    <div className="movie-page">
      <h1>{movie.title}</h1>
    </div>
  );
};

export default MovieDetails;
