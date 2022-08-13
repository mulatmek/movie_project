const MovieServices = require("../services/Movie");
const { body, validationResult, validationErrors } = require('express-validator');

const addMovie = (req, res) => {
    const errors = validationResult(req); //ADD VALIDATION TO INPUT HERE (check that all fields are entered and so on)

    //ENTER IF ONLY IF THE GIVEN PARAMETERS ARE VALID
    if (errors.isEmpty()) { //No errors were found.  Passed Validation!
        MovieServices.createMovie(req.body).then().catch((errors) => {console.log("Failed to insert the movie, error is: " + errors);});
        res.redirect('/admin');
    }
}

module.exports = {
    addMovie
};
