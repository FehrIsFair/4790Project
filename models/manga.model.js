import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mangaSchema = new Schema({
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

export const Manga = mongoose.model("Manga", mangaSchema, "Manga");
