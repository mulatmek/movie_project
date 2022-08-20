const MovieServices = require("../services/Movie");
const { body, validationResult } = require("express-validator");
const movieValidation = body("title")
  .isLength({ min: 1 })
  .withMessage("Movie title cannot be empty");

const addMovie = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await MovieServices.createMovie(req.body);
      res.send("ok");
    } else {
      console.log("error");
    }
  } catch (e) {
    res.status(401).send("Error");
  }
};

const editMovie = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const movieToUpdate = req.body;
      const { id } = movieToUpdate; //Extracting the id out of the body that I will be able to send it to the update function, and then deleting it from the body that it won't cause issues
      delete movieToUpdate.id;
      await MovieServices.updateMovie(id, movieToUpdate);
      res.send("ok");
    }
  } catch (e) {
    res.status(401).send("Error");
  }
};

const getMovieById = async (req, res) => {
  try {
    const movieDetails = await MovieServices.getMovieById(req.params.id);
    res.send(movieDetails);
  } catch (e) {
    res.status(401).send("Error");
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await MovieServices.getMovies();
    res.send(movies);
  } catch (e) {
    res.status(401).send("Error");
  }
};

const countByGenre = async (req, res) => {
  try {
    const result = await MovieServices.countByGenre();
    res.send(result);
  } catch (e) {
    res.status(401).send("Error");
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const ok = await MovieServices.deleteMovie(id);
    res.send(ok);
  } catch (e) {
    res.status(401).send("Error");
  }
};

module.exports = {
  movieValidation,
  getMovies,
  countByGenre,
  deleteMovie,
  addMovie,
  editMovie,
  getMovieById,
};
