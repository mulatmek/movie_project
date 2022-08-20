import axios from "axios";

const getMovieList = async () => {
  try {
    const res = await axios.get("http://localhost:8080/movie");
    return res.data;
  } catch (err) {}
};

export const movieService = {
  getMovieList,
};
