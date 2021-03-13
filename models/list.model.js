import mongoose from "mongoose";

const Schema = mongoose.Schema;

const listSchema = new Schema({
  animeList: {
    type: Array,
    required: true,
  },
  mangaList: {
    type: Array,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  }
});

export const FavoriteList = mongoose.model("FavoriteList", listSchema, "List");