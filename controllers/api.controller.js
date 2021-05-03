import bcrypt from "bcrypt";

import { Users } from "../models/user.model.js";
import {Character} from "../models/char.model.js"

export const authUser = (req, res) => {
  console.log(req.body);
  try {
    Users.find()
      .where({ UserName: req.body.UserName })
      .exec(async (err, user) => {
        if (err)
          res.status(400).json({ Message: `Could not find user: ${err}` });
        const result = await bcrypt.compare(
          req.body.Password,
          user[0].Password
        );
        console.log(result);
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
    res.status(400).json({ auth: false });
  }
};

export const getUser = (req, res) => {
  console.log(req.params)
  if (!req.params.UserName) {
    res.status(400).json({Message: "Please login first"});
  }
  try {
    Users.find()
      .where({UserName: req.params.UserName})
      .exec((err, user) => {
        console.log(user)
        if (err) res.status(400).json({Message: `Couldn't find user: ${err}`});
        res.status(200).json({
          UserName: user[0].UserName,
          FavAnime: user[0].FavAnime,
          FavCharacter: user[0].FavCharacter,
          FavManga: user[0].FavManga,
        });
      })
  } catch (err) {
    res.status(400).json({Message: `Couldn't Query: ${err}`})
  }
};

export const createUser = (req, res) => {
  console.log(req.body);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.Password, salt, (err, hash) => {
      if (err) res.status(400).json({ Message: `Failed to salt: ${err}` });
      const newUser = new Users({
        UserName: req.body.UserName,
        Password: hash,
        FavCharacer: req.body.FavCharacter,
        FavAnime: req.body.FavAnime,
        FavManga: req.body.FavManga,
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
    Users.deleteOne({ UserName: req.params.UserName }, (err) => {
      if (err)
        res
          .status(400)
          .json({ Message: `Could not find user to delete: ${err}` });
      res.status(200).json({ Message: "Successfully deleted user" });
    });
  } catch (err) {
    res.status(400).json({ Message: `Could not delete user: ${err}` });
  }
};

export const updatePassword = (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.Password, salt, async (err, hash) => {
      if (err) res.status(400).json({ Message: `Failed to salt: ${err}` });
      const modifiedUser = {
        UserName: req.body.UserName,
        Password: hash,
      };
      try {
        await Users.findOneAndUpdate(
          { UserName: req.body.UserName },
          modifiedUser
        );
        res.status(200).json({ success: true });
      } catch (err) {
        res.status(400).json({ success: false });
      }
    });
  });
};

export const getCharacters = async (req, res) => {
  const chars = await Character.find();
  if (!chars) {
    res.status(400).json({Message: "Could not find characters"});
  } else {
    res.status(200).json(chars);
  }
}