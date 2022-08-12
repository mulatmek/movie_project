const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    title: {type: String, unique: true},
    year: {type: Number},
    genre: {type: String},
    description: {type: String},
    image_url: {type: String},
    trailer_video: {type: String},
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reviews'
        }
    ]
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = {
    mongoose,
    Movie
}
