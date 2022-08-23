import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context";
import { movieService } from "../services/movie.service";

//Bootstarp addition to css
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
></link>;

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
      });
    } catch (e) {}
  };
  return (
        <body className="admin-page">
      <button type="button" class="btn btn-success"
        id="add-button"
        onClick={() => setIsAddMovie(true)}
      >
        Add movie
      </button>
      <ul>
        {movies.length &&
          movies.map((movie) => (
            <li key={movie.id}>
              <img
                class="movie-picture"
                src={movie.imageUrl}
                alt="movie poster"
              />
              <h4 class="movie-name">{movie.title}</h4>
              <div className="actions">
                <button type="button" class="btn btn-danger"
                  id="delete-button"
                  onClick={() => deleteMovie(movie.id)}
                >
                  Delete
                </button>
                <button type="button" class="btn btn-primary"
                  id="edit-button"
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
          <button type="button" class="btn btn-outline-danger"
            id="close-modal"
            onClick={() => {
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
              });
            }}
          >
            X
          </button>
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
          <textarea
            onInput={inputHandler}
            name="description"
            style={{fontSize: '12px', resize: 'none', height: '70px', width: '70%'}}
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
            <option value="romance">Romance</option>
            <option value="sci-fi">Science Fiction</option>
            <option value="fantasy">Fantasy</option>
          </select>
          <button type="button" class="btn btn-outline-success" onClick={handleSave}>Save</button>
        </div>
      )}
    </body>
  );
};

export default AdminPage;
