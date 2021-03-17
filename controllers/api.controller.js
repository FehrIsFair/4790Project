import axios from "axios";

import { FavoriteList } from "../models/list.model.js";
import { Manga } from "../models/manga.model.js";
import { Anime } from "../models/anime.model.js";

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
  try {
    const { data } = await jikanApi.get(`/manga/${req.params.mal_id}`);
    res.json(data);
  } catch (err) {
    res.status(400).json({ Message: `Couldnl't fetch detail. ${err}` });
  }
};

// Third Get
export const getList = (req, res) => {
  let data;
  try {
    FavoriteList.find()
      .where({ uid: req.params.uid })
      .exec((err, list) => {
        if (err)
          res
            .status(400)
            .json({ Message: `Couldn't find a list with that UID ${err}` });
        res.json(list);
      });
  } catch (err) {
    res.status(400).json({ Message: `Invalid User ID ${err}` });
  }
};

// put
export const editFavoriteList = async (req, res) => {
  const favID = req.body._id.$oid;
  const newList = {
    animeList: req.body.animeList,
    mangaList: req.body.mangaList,
    uid: req.body.uid,
  };
  try {
    const list = await FavoriteList.findByIdAndUpdate(favID, newList, {
      new: true,
      useFindAndModify: true,
    });
    res.status(200).json(list); // mainly for debug reasons.
  } catch (err) {
    res.status(400).json({ Message: `Could not update ${err}` });
  }
};

// delete
export const deleteFavoriteList = async (req, res) => {
  const favID = req.body._id.$oid;
  try {
    FavoriteList.findByIdAndDelete(favID, (err, list) => {
      if (err) res.status(400).json({ Message: `No list to delete ${err}` });
      res.status(200).json({ success: true });
    });
  } catch (err) {
    res.status(400).json({ Message: `Could not delete${err}` });
  }
};

// POST
export const createNewFavoriteList = async (req, res) => {
  const newList = new FavoriteList({
    animeList: req.body.animeList,
    mangaList: req.body.mangaList,
    uid: req.body.uid,
  });
  try {
    newList.save();
    res.status(200).json({ Message: "success" });
  } catch (err) {
    res.status(400).json({ Message: `Could not create${err}` });
  }
};

// First get endpoint
export const getAnime = async (req, res) => {
  const anime = await Anime.find();
  if (!anime) {
    return res.status(400).json({ Message: `No anime found` });
  }
  res.status(200).json(anime);
};

// This is just how the api I was using before worked. When we get to GraphQL, I'll be able to get rid of this.
export const getAnimeDetail = async (req, res) => {
  try {
    const { data } = await jikanApi.get(`/anime/${req.params.mal_id}`);
    res.json(data);
  } catch (err) {
    res.status(400).json({ Message: `Couldnl't fetch detail. ${err}` });
  }
};
