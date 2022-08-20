const MovieServices = require("../services/Movie");
const { body, validationResult } = require("express-validator");
const movieValidation = body("title")
  .isLength({ min: 1 })
  .withMessage("Movie title cannot be empty");

const getMovies = async (req, res) => {
  const movies = await MovieServices.getMovies();
  res.send(movies);
};

module.exports = {
  getMovies,
  movieValidation,
};
