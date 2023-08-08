const { Schema, model } = require("mongoose");

// Define the Movie schema
const movieSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    cast: [{
      type: Schema.Types.ObjectId,
      ref: 'Celebrity'
    }]
  });
  
  // Create the Movie model
  const Movie = model('Movie', movieSchema);
  module.exports = Movie;