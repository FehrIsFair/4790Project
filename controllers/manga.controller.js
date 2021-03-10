import axios from "axios";

import FavoriteList from "../models/list.model";
import Manga from "../models/manga.model";

// again I can get rid of this later when we move to graphql
const jikanApi = axios.create({
  baseURL: "https://api.jikan.moe/v3/",
});

// First get endpoint
export const getManga = async (req, res) => {
  const manga = await Manga.find();
  if (!manga) {
    return res.status(400).json({ Message: `No manga found` });
  }
  res.json(manga);
};

// This is just how the api I was using before worked. When we get to GraphQL, I'll be able to get rid of this.
export const getMangaDetail = async (req, res) => {
  const { data } = await jikanApi.get(`manga?q=${req.body.mal_id}`);
  res.json(data);
};

// third get, this is also done this way to ensure I have the right list for the fron end.
export const getList = async (res, req) => {
  const uid = req.body.uid;
  try {
    const list = await FavoriteList.findOne({
      uid: uid,
      type: "manga",
    });
    res.json(list);
  } catch (err) {
    res.status(400).json({ Message: `Could not find list ${err}` });
  }
};

// put
export const editFavoriteList = async (res, req) => {
  const favID = req.body._id;
  const newList = {
    list: req.body.list,
    type: req.body.type,
    uid: req.body.uid,
  };
  try {
    const list = await FavoriteList.findByIdAndUpdate(favID, newList, {
      new: true,
    });
    res.json(list);
  } catch (err) {
    res.status(400).json({ Message: `Could not update${err}` });
  }
};

export const deleteFavoriteList = async (req, res) => {
  const favID = req.body._id;
  try {
    const deletedList = FavoriteList.findByIdAndDelete(favID);
    if (!deletedList) {
      return res.status(400).json({ Message: "No list to delete" });
    }
    res.sendStatus();
  } catch (err) {
    res.status(400).json({Message: `Could not delete${err}`})
  }
};
