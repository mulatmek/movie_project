import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { movieService } from "../services/movie.service";

const HomePage = () => {
    const ctx = useContext(Context);
    const [countBy, setCount] = useState([]);
    
    useEffect(() => {
      const getCountByGenre = async () => {
        const result = await movieService.getCountByGenre();
        console.log(result);
        setCount(result);
      };
      if (!countBy.length) {
        getCountByGenre();
      }
    });
  
    return (
      <div>
        {countBy.length &&
          countBy.map((movie) => (
            <div>
              <img src={movie.imageUrl} alt="movie poster" />
              <h4>{movie.title}</h4>
            </div>
          ))}
      </div>
    );
}

export default HomePage;
