const MovieServices = require("../services/Movie");
const { body, validationResult } = require('express-validator');
const movieValidation = body('title').isLength({ min: 1 }).withMessage('Movie title cannot be empty');

const addMovie = (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) { //No errors were found. Passed express-validator Validation!
        MovieServices.getMovieByTitle(req.body.title).then((movie) => {
            if (movie.length) {
                console.log("A movie with the same title already exists. title has to be unique");
                res.redirect('/admin');
            }
            else {
                console.log("inserting data");
                MovieServices.createMovie(req.body).then().catch((errors) => {console.log("Failed to insert the movie, error is: " + errors);});
                res.redirect('/admin');
            }
        });
    }
    else {
        console.log(errors);
        res.redirect('/admin');
    }
}

module.exports = {
    addMovie,
    movieValidation,
};
