import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context";

import { movieService } from "../services/movie.service";

const AdminPage = () => {
  const ctx = useContext(Context);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!ctx.user?.isAdmin) navigate("/dashboard");
    const getMovies = async () => {
      const result = await movieService.getMovieList();
      setMovies(result);
    };
    if (!movies.length) {
      getMovies();
    }
  });

  return (
    <div>
      {movies.length &&
        movies.map((movie) => (
          <div>
            <img src={movie.imageUrl} alt="movie poster" />
            <h4>{movie.title}</h4>
          </div>
        ))}
    </div>
  );
};

export default AdminPage;
