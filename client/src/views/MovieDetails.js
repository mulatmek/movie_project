import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../context";
import { Rating } from "react-simple-star-rating";
import starIcon from "../icons/star.png";

const MovieDetails = () => {
  const ctx = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);

  const getMovie = async (movieId) => {
    try {
      const res = await axios.get(`http://localhost:8080/movie/${movieId}`);
      if (!res.data) navigate("/error");
      const userRating = res.data.ratings.find(
        (rate) => rate.userEmail === ctx.user.email
      )?.rate;
      if (userRating) setRating(userRating * 20);
      setMovie(res.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleRating = async (rate) => {
    setRating(rate);
    await axios.put("http://localhost:8080/rate-movie", {
      rate,
      movieId: movie.id,
      userEmail: ctx.user.email,
    });
    await getMovie(movie.id);
  };

  useEffect(() => {
    if (!ctx.user) navigate("/login");
    if (!movie.title) {
      getMovie(params.id);
    }
  });

  return (
    <div className="movie-page">
      <h1 className="movie-information-name">{movie.title}</h1>
      <h2>
        Rating:{" "}
        {movie.ratings?.reduce(
          (previousValue, rate) => previousValue + rate.rate,
          0
        ) / movie.ratings?.length} 
        <img style={{width: '30px'}} src={starIcon} />
      </h2>
      <img className="movie-picture" src={movie.imageUrl} alt="movie poster" />
      <h3 className="movie-information"> Premier in {movie.year}</h3>
      <h3 className="movie-information"> {movie.description}</h3>
      <Rating
        onClick={handleRating}
        ratingValue={rating}
        allowHalfIcon
        transition
        style={{marginBottom: '20px'}}
      />
    </div>
  );
};

export default MovieDetails;
