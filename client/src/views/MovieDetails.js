import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../context";

const MovieDetails = () => {
  const ctx = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();
  const [movie, setMovie] = useState({});

  const getMovie = async (movieId) => {
    try {
      const res = await axios.get(`http://localhost:8080/movie/${movieId}`);
      if (!res.data) navigate("/error");
      setMovie(res.data);
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if (!ctx.user) navigate("/login");
    if (!movie.title) {
      getMovie(params.id);
    }
  });

  return (
    <div className="movie-page">
      <h1 class="movie-information-name">{movie.title}</h1>
      <img class="movie-picture" src={movie.imageUrl} alt="movie poster" />
      <h3 class="movie-information"> Premier in {movie.year}</h3>
      <h3 class="movie-information"> {movie.description}</h3>
    </div>
  );
};

export default MovieDetails;
