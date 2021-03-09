import mongoose from "mongoose";

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  mal_id: {
    type: Number,
    required: true,
  }
});

export default Favorite = mongoose.model("Favorite", favoriteSchema)