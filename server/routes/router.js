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
  countMovies,
  rateMovie,
} = require("../controllers/databaseController");
const {
  getUsers,
  countUsers
} = require("../controllers/userController");

const router = express.Router();

//movies routes
router.post("/add-movie", movieValidation(), addMovie);
router.put("/edit-movie", movieValidation(), editMovie);
router.put("/rate-movie", rateMovie);
router.get("/movie/:id", getMovieById);
router.get("/movie", getMovies);
router.get("/countMovies", countMovies);
router.get("/countGenre", countByGenre);
router.delete("/movie/:id", deleteMovie);

//users routes
router.get("/user", getUsers);
router.get("/countUsers", countUsers);

//loginController routes
router.post("/login", loginUser);
router.post("/register", registerValidation(), registerUser);

module.exports = router;
