const { Movie } = require('../models/Movie');

const createMovie = (body) => {
    const newMovie = new Movie({
        title: body.title,
        year: body.year,
        genre: body.genre,
        description: body.description,
        imageUrl: body.imageUrl,
        trailerVideo: body.trailerVideo
    });
    return newMovie.save();
};

const getMovieById = (id) => {
    return Movie.findOne({id: id});
};

const getMovieByTitle = (title) => {
    return Movie.find({'title': title});
};

const getMoviesByGenre = (genre) => {
    return Movie.find({'genre': {$regex: `.*${genre}.*`, $options:'i'}});
};

const deleteMovie = async (id) => {
    return await Movie.findOneAndDelete({'id': id});
};

const countMovies = async () => {
    return await Movie.countDocuments({})
};

const countByGenre = async () => {
    return Movie.aggregate([
        {
            $group: {
                _id: {'genre': {$toLower: "$genre"}},
                count: {$sum: 1}
            }
        },
        {
            $sort: {count:-1}
        },
        {
            $limit:6
        }
    ]);
};

const updateMovie = async (id, body) => {
    const movie = await getMovieById(id);
    if (!movie.length)
        return null;

    movie.title = body.title;
    movie.year = body.year;
    movie.genre = body.genre;
    movie.description = body.description;
    movie.imageUrl = body.imageUrl;
    movie.trailerVideo = body.trailerVideo;
    await movie.save();
    return movie;
};

module.exports = {
    createMovie,
    getMovieById,
    getMovieByTitle,
    getMoviesByGenre,
    deleteMovie,
    countMovies,
    countByGenre,
    updateMovie,
}
