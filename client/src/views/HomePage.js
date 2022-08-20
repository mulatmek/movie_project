import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { movieService } from "../services/movie.service";
import { userService } from "../services/user.service";

const HomePage = () => {
  const ctx = useContext(Context);
  const [countMovies, setCountMovies] = useState(null);
  const [countUsers, setCountUsers] = useState(null);
  const [countBy, setCount] = useState([]);

  useEffect(() => {
    const getCountByGenre = async () => {
      const result = await movieService.getCountByGenre();
      setCount(result);
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
    <div className="Statistics">
      <div className="totalUsers">
        There are {countUsers} registered users in our website!
      </div>
      <div className="totalMovies">
        <p>
          There are {countMovies} movies in our website!
        </p>
      </div>
      <div className="CountByGenre">
        {countBy.length &&
          countBy.map((item) => (
            <p>
              Genre: {item._id.genre}, number of movies: {item.count}
            </p>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
