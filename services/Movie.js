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

const getMoviesByGenre = async (genre) => {
    return await Movie.find({'genre': {$regex: `.*${genre}.*`, $options:'i'}});
};

const getReviewsByMovieId = async (id) => {
    return await Movie.findById(id, {'_id':0, 'reviews':1});
};

const deleteMovie = async (id) => {
    const movie = await getMovieById(id);

    if (!movie)
        return null;

    await movie.remove();
    
    return movie;
};

const removeMovieReviews = async (review_ids) => {
    return Movie.update({}, {$pull:{"reviews":{$in:review_ids}}},{multi:true});
};


const countMovies = async () => {
    return await Movie.countDocuments({})
};

const countByGenre = async () => {
    return Movie.aggregate([
        {
            $group: {
                _id: "$genre",
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
    if (!movie)
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

const updateReviewOfMovie = async (id, review) => {
    const movie = await getMovieById(id);
    if (!movie)
        return null;

    if (!review)
        return null

    if (movie.reviews.indexOf(review._id) === -1) {
        movie.reviews.push(review._id);
    }
    await movie.save();

    return movie;
};

module.exports = {
    createMovie,
    getMovieById,
    getMovieByTitle,
    getMoviesByGenre,
    getReviewsByMovieId,
    deleteMovie,
    removeMovieReviews,
    countMovies,
    countByGenre,
    updateMovie,
    updateReviewOfMovie,
}
