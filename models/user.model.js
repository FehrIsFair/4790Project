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
});

export const Users = mongoose.model("Users", userSchema, "users");