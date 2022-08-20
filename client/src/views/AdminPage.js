import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context";

import { movieService } from "../services/movie.service";

const AdminPage = () => {
  const ctx = useContext(Context);
  const [movies, setMovies] = useState([]);
  const [isAddMovie, setIsAddMovie] = useState(false);
  const [isEditMovie, setIsEditMovie] = useState(false);
  const [editedMovie, setEditedMovie] = useState({
    id: null,
    title: "",
    imageUrl: "",
    year: "",
    description: "",
    genre: null,
    trailerVideo: "",
  });
  const navigate = useNavigate();

  const getMovies = async () => {
    const result = await movieService.getMovieList();
    console.log(result);
    setMovies(result);
  };

  useEffect(() => {
    if (!ctx.user?.isAdmin) navigate("/dashboard");

    if (!movies.length) {
      getMovies();
    }
  });

  const deleteMovie = async (movieId) => {
    try {
      const ok = await axios.delete(`http://localhost:8080/movie/${movieId}`);
      if (ok) {
        getMovies();
      }
    } catch (e) {}
  };

  const inputHandler = (e) => {
    setEditedMovie({
      ...editedMovie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (isEditMovie) {
        await axios.put("http://localhost:8080/edit-movie", editedMovie);
      } else {
        await axios.post("http://localhost:8080/add-movie", editedMovie);
      }
      await getMovies();

      setIsEditMovie(false);
      setIsAddMovie(false);
      setEditedMovie({
        id: null,
        title: "",
        imageUrl: "",
        year: "",
        description: "",
        genre: null,
        trailerVideo: "",
      })
    } catch (e) {}
  };

  return (
    <div className="admin-page">
      <button onClick={() => setIsAddMovie(true)}>Add movie</button>
      <ul>
        {movies.length &&
          movies.map((movie) => (
            <li key={movie.id}>
              <img src={movie.imageUrl} alt="movie poster" />
              <h4>{movie.title}</h4>
              <div className="actions">
                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
                <button
                  onClick={() => {
                    setIsEditMovie(true);
                    setEditedMovie(movie);
                  }}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
      </ul>
      {(isAddMovie || isEditMovie) && (
        <div className="add-movie-modal">
          <button className="close-modal" onClick={() => {
            setIsEditMovie(false)
            setIsAddMovie(false)
            setEditedMovie({
              id: null,
              title: "",
              imageUrl: "",
              year: "",
              description: "",
              genre: null,
              trailerVideo: "",
            })
          }}>X</button>
          <h2>{isEditMovie ? "Edit" : "Add"} Movie</h2>
          <input
            onInput={inputHandler}
            name="title"
            type="text"
            placeholder="Title"
            value={editedMovie.title}
          />
          <input
            onInput={inputHandler}
            name="year"
            type="number"
            placeholder="Year"
            value={editedMovie.year}
          />
          <input
            onInput={inputHandler}
            name="imageUrl"
            type="text"
            placeholder="Image Link"
            value={editedMovie.imageUrl}
          />
          <input
            onInput={inputHandler}
            name="description"
            type="text"
            placeholder="Description"
            value={editedMovie.description}
          />
          <input
            onInput={inputHandler}
            name="trailerVideo"
            type="text"
            placeholder="Trailer Link"
            value={editedMovie.trailerVideo}
          />
          <select value={editedMovie.genre} onInput={inputHandler} name="genre">
            <option disabled selected value={null}>
              Select Genre
            </option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="horror">Horror</option>
            <option value="drama">Drama</option>
            <option value="sci-fi">Science Fiction</option>
          </select>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
