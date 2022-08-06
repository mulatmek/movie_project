const mongoose = require("mongoose");

//need to make sure every movie has ID because we will allow accessing a movie by /movie=<id>
const MovieSchema = {
    title: {type:String, unique: true},
    year: Number,
    genre: String,
    description: String,
    image_url: String,
    trailer_video: String,
    reviews: String
};

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
