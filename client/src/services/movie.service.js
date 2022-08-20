import axios from "axios";

const getMovieList = async () => {
  try {
    const res = await axios.get("http://localhost:8080/movie");
    return res.data;
  } catch (err) {}
};

const getCountMovies = async () => {
  try {
    const res = await axios.get("http://localhost:8080/countMovies");
    return res.data;
  } catch (err) {}
};

const getCountByGenre = async () => {
  try {
    const res = await axios.get("http://localhost:8080/countGenre");
    return res.data;
  } catch (err) {}
};

export const movieService = {
  getMovieList,
  getCountByGenre,
  getCountMovies,
};
