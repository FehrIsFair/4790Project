import bcrypt from "bcrypt";

import { Users } from "../models/user.model.js";

export const authUser = (req, res) => {
  try {
    Users.find()
    .where({ UserName: req.body.UserName })
    .exec(async (err, user) => {
      if (err) res.status(400).json({ Message: `Could not find user: ${err}` });
      const result = await bcrypt.compare(req.body.Password, user[0].Password);
      if (user.length !== 0) {
        if (result) {
          res.status(200).json({ auth: true });
        } else {
          res.status(400).json({ auth: false });
        }
      } else {
        res.status(400).json({ auth: false });
      }
    });
  } catch (err) {
    res.status(400).json({auth: false});
  }
};

export const createUser = (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.Password, salt, (err, hash) => {
      if (err) res.status(400).json({ Message: `Failed to salt: ${err}` });
      const newUser = new Users({
        UserName: req.body.UserName,
        Password: hash,
      });
      try {
        newUser.save();
        res.status(200).json({ auth: true });
      } catch (err) {
        res.status(400).json({ auth: false });
      }
    });
  });
};

export const deleteUser = async (req, res) => {
  try {
    Users.deleteOne()
      .where({ Username: req.params.UserName })
      .exec((err, user) => {
        if (err)
          res.status(400).json({ Message: `Could not delete user: ${err}` });
        res.status(200).json({ Message: "user Successfully deleted." });
      });
  } catch (err) {
    res.status(400).json({ Message: `Could not delete user: ${err}` });
  }
};
