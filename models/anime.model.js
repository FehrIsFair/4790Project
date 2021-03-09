import mongoose from "mongoose";

const Schema = mongoose.Schema;

const animeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  promoArtURL: {
    type: String,
    required: true,
  },
  mal_id: {
    type: Number,
    required: true,
  }
});

export default Anime = mongoose.model("Anime", animeSchema);
