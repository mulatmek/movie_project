const mongoose = require("mongoose");
const { autoIncrementModelID } = require("./counterModel");

const MovieSchema = new mongoose.Schema({
  id: { type: Number, unique: true, min: 1 },
  title: { type: String, unique: true },
  year: { type: Number },
  genre: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  trailerVideo: { type: String },
  // reviews: [
  //     {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: 'Reviews'
  //     }
  // ]
});

MovieSchema.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID("movies", this, next);
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = {
  Movie,
};
