const MovieServices = require("../services/Movie");
const { body, validationResult } = require('express-validator');
const movieValidation = body('title').isLength({ min: 1 }).withMessage('Movie title cannot be empty');

const addMovie = (req, res) => {
    MovieServices.createMovie(req.body);
    res.redirect("/admin");
}
const removeMovie = (req, res) => {
    MovieServices.deleteMovie(req.body.delete);
    res.redirect("/admin");
}

module.exports = {
    addMovie,
    removeMovie,
    movieValidation,
};
