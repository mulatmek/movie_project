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
  return Movie.aggregate([
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
  return await Movie.findOneAndUpdate({id}, body)
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
};
