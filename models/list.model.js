import mongoose from "mongoose";

const Schema = mongoose.Schema;

const listSchema = new Schema({
  list: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  uid: {
    type: Number,
    required: true,
  }
});

export default List = mongoose.model("Favorite List", listSchema);