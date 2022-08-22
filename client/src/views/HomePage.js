import { useEffect, useState } from "react";
import { movieService } from "../services/movie.service";
import { userService } from "../services/user.service";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [countMovies, setCountMovies] = useState(null);
  const [countUsers, setCountUsers] = useState(null);
  const [countBy, setCount] = useState([]);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const result = await movieService.getMovieList();
    setMovies(result);
  };

  useEffect(() => {
    const getCountByGenre = async () => {
      const result = await movieService.getCountByGenre();
      setCount(result);

      if (!movies.length) {
        getMovies();
      }
    };

    const getCountMovies = async () => {
      const result = await movieService.getCountMovies();
      setCountMovies(result.countMovies);
    };

    const getCountUsers = async () => {
      const result = await userService.getCountUsers();
      setCountUsers(result.countUsers);
    };

    if (!countBy.length) {
      getCountByGenre();
    }

    if (!countMovies) {
      getCountMovies();
    }

    if (!countUsers) {
      getCountUsers();
    }
  });

  return (
    <div className="home-page">
      <div className="totalUsers">
        There are {countUsers} registered users in our website!
      </div>
      <div className="totalMovies">
        <p>There are {countMovies} movies in our website!</p>
      </div>
      <div className="CountByGenre">
        {countBy.length &&
          countBy.map((item) => (
            <p key={item._id.genre}>
              Genre: {item._id.genre}, number of movies: {item.count}
            </p>
          ))}

        <div>
          <ul>
            {movies.length &&
              movies.map((movie) => (
                <li key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
