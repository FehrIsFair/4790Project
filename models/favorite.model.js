import mongoose from "mongoose";

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  id: {
    type: Number,
    required: true,
  }
});

export default Favorite = mongoose.model("Favorite", favoriteSchema)