//Get request for Movie page
const movieView = (req, res) => {
    res.render("movie", {movieId: req.params.id}); //also passing the requested movie id to movies.ejs
};

module.exports = {
    movieView,
};
