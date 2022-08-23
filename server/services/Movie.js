const { Movie } = require("../models/Movie");

const createMovie = async (body) => {
  try {
    const isMovieInList = await getMovieByTitle(body.title);
    if (isMovieInList.length) {
      throw new Error("Movie already in list");
    }
    const newMovie = new Movie({
      title: body.title,
      year: body.year,
      genre: body.genre,
      description: body.description,
      imageUrl: body.imageUrl,
      trailerVideo: body.trailerVideo,
    });
    await newMovie.save();
  } catch (e) {
    throw new Error(e);
  }
};

const getMovies = async () => {
  return await Movie.find({});
};

const getMovieById = async (id) => {
  return await Movie.findOne({ id: id });
};

const getMovieByTitle = async (title) => {
  return await Movie.find({ title: title });
};

const getMoviesByGenre = async (genre) => {
  return await Movie.find({ genre: { $regex: `.*${genre}.*`, $options: "i" } });
};

const deleteMovie = async (id) => {
  return await Movie.findOneAndDelete({ id: id });
};

const countMovies = async () => {
  return await Movie.countDocuments({});
};

const countByGenre = async () => {
  return await Movie.aggregate([
    {
      $group: {
        _id: { genre: { $toLower: "$genre" } },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 6,
    },
  ]);
};

const updateMovie = async (id, body) => {
  return await Movie.findOneAndUpdate({ id }, body);
};

const rateMovie = async (rateData) => {
  const movie = await Movie.findOne({ id: rateData.movieId });
  const movieCopy = {...movie._doc}
  const ratingToAdd = {
    userEmail: rateData.userEmail,
    rate: rateData.rate / 20,
  };

  if (!movieCopy.ratings?.length) {
    movieCopy.ratings = [ratingToAdd];
  } else {
    const existingRateByUserIdx = movieCopy.ratings.findIndex(
      (rating) => rating.userEmail === rateData.userEmail
    );
    existingRateByUserIdx === -1
      ? movieCopy.ratings.push(ratingToAdd)
      : (movieCopy.ratings[existingRateByUserIdx] = ratingToAdd);
  }
  await Movie.findOneAndUpdate({id: movieCopy.id}, movieCopy)
};

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  getMovieByTitle,
  getMoviesByGenre,
  deleteMovie,
  countMovies,
  countByGenre,
  updateMovie,
  rateMovie,
};
