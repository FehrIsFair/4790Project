import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  UserName: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  FavCharacter: {
    type: String,
  },
  FavAnime: {
    type: String,
  },
  FavManga: {
    type: String,
  },
});

export const Users = mongoose.model("Users", userSchema, "users");