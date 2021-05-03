import mongoose from "mongoose";

const Schema = mongoose.Schema;

const charSchema = new Schema({
  name: {
    type: Object,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Character = mongoose.model("Character", charSchema, "Characters");