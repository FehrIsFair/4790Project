import bcrypt from "bcrypt"

import { Users } from "../models/user.model.js";

// First get endpoint
export const getUser = async (req, res) => {
  try {
    const user = await Users.find()
    .where({ UserName: req.params.Username })
    .exec(async (err, user) => {
      if (err) res.status(400).json({Message: "Could not find user with username/password combo"});
      res.json(user[0]);
    });
  } catch (err) {
    res.status(500).json({Message: ``})
  }
};

// put
// export const editFavoriteList = async (req, res) => {
//   const favID = req.body._id;
//   const newList = {
//     animeList: req.body.animeList,
//     mangaList: req.body.mangaList,
//     uid: req.body.uid,
//   };
//   try {
//     const list = await FavoriteList.findByIdAndUpdate(favID, newList, {
//       new: true,
//       useFindAndModify: false,
//     });
//     console.log(list);
//     res.status(200).json({ Message: "Successfully Edited" }); // mainly for debug reasons.
//   } catch (err) {
//     res.status(400).json({ Message: `Could not update ${err}` });
//   }
// };

// delete
export const deleteUser = async (req, res) => {
  console.log(req.params);
  const id = req.params._id;
  try {
    Users.findByIdAndDelete(id, (err, user) => {
      if (err) res.status(400).json({ Message: `No list to delete ${err}` });
      res.status(200).json({ success: true });
    });
  } catch (err) {
    res.status(400).json({ Message: `Could not delete${err}` });
  }
};

// POST
export const createNewFavoriteList = async (req, res) => {
  const newList = new Users({
    UserName: req.body.userName,
    Password: req.body.password,
    uid: req.body.uid,
  });
  try {
    console.log(newList);
    newList.save();
    res.status(200).json({ Message: "success" });
  } catch (err) {
    res.status(400).json({ Message: `Could not create ${err}` });
  }
};
