import axios from "axios"

import FavoriteList from "../models/list.model"
import Anime from "../models/anime.model";

// again I can get rid of this later when we move to graphql
const jikanApi = axios.create({
  baseURL: "https://api.jikan.moe/v3/",
});

// third get
export const getList = async (res, req) => {
  const uid = req.body.uid;
  try {
    const list = await FavoriteList.findOne({
      uid: uid,
      type: "anime"
    });
    res.json(list);
  } catch (err) {
    res.status(400).json({Message: `Could not find list ${err}`});
  }
}

// First get endpoint
export const getAnime = async (req, res) => {
  const anime = await Anime.find();
  if (!anime) {
    return res.status(400).json({Message: `No anime found`})
  }
  res.json(anime);
};

// This is just how the api I was using before worked. When we get to GraphQL, I'll be able to get rid of this.
export const getAnimeDetail = async (req, res) => {
  const {data} = await jikanApi.get(`anime?q=${req.body.mal_id}`);
  res.json(data);
}

// put
export const editFavoriteList = async (res, req) => {
  const favID = req.body._id;
  const newList = {
    "list": req.body.list,
    "type": "anime",
    "uid": req.body.uid,
  };
  try  {
    const list = await FavoriteList.findByIdAndUpdate(favID, newList, {new: true});
    res.json(list);
  } catch (err) {
    res.status(400).json({Message: `Could not update${err}`});
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