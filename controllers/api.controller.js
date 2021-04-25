import bcrypt from "bcrypt";

import { Users } from "../models/user.model.js";

export const authUser = async (req, res) => {
  const user = await Users.find()
    .where({ UserName: req.params.UserName })
    .exec((err) => {
      if (err) res.status(400).json({Message: `Could not find user ${err}`, auth: false });
    });
  if (user.Password === req.params.Password) {
    res.status(200).json({
      auth: true,
    });
  } else {
    res.status(400).json({
      auth: false,
    });
  }
};

export const createUser = async (req, res) => {
  let newUser;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.Password, salt, (err, hash) => {
      if (err) res.status(400).json({Message: `Failed to create new user ${err}`});
      newUser = new Users({
        UserName: req.body.UserName,
        Password: hash,
      });
    });
  });
  try {
    newUser.save();
    res.status(200).json({Message: "Created user", auth: true});
  } catch (err) {
    res.status(400).json({Message: `Could not create user ${err}`, auth: false});
  }
};

export const deleteUser = async (req, res) => {
  try {
    Users.deleteOne().where({Username: req.body.UserName}).exec((err, user) => {
      if (err) res.status(400).json({Message: `Could not delete user: ${err}`});
      res.status(200).json({Message: "user Successfully deleted."});
    });
  } catch (err) {
    res.status(400).json({Message: `Could not delete user: ${err}`})
  }
};
