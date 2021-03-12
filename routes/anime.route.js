import { Router } from "express";

import {
  getAnime,
  getList,
  getAnimeDetail,
  editFavoriteList,
  deleteFavoriteList,
  createNewFavoriteList
} from "../controllers/anime.controller.js";

export const animeRouter = Router();

animeRouter.get("/", getAnime);

animeRouter.get("/animeList", getList);

animeRouter.put("/editList", editFavoriteList);

animeRouter.delete("/deleteList", deleteFavoriteList);

animeRouter.get("/animeDetail", getAnimeDetail);

animeRouter.post("/createList", createNewFavoriteList);