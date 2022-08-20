const express = require("express");
const {
  registerValidation,
  registerUser,
  loginUser,
} = require("../controllers/loginController");
const {
  movieValidation,
  getMovies,
  countByGenre,
  deleteMovie,
  addMovie,
  editMovie,
  getMovieById,
} = require("../controllers/databaseController");

const router = express.Router();

//movies routes
router.post("/add-movie", [movieValidation], addMovie);
router.put("/edit-movie", [movieValidation], editMovie);
router.get("/movie/:id", getMovieById);
router.get("/movie", getMovies);
router.get("/countGenre", countByGenre);
router.delete("/movie/:id", deleteMovie);

//loginController routes
router.post("/login", loginUser);
router.post("/register", registerValidation(), registerUser);

module.exports = router;
