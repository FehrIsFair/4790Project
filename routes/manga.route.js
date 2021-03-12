import { Router } from "express";

import {
  getManga,
  getList,
  getMangaDetail,
  editFavoriteList,
  deleteFavoriteList,
  createNewFavoriteList
} from "../controllers/manga.controller.js";

export const mangaRouter = Router();

mangaRouter.get("/", getManga);

mangaRouter.get("/mangaList", getList);

mangaRouter.put("/editList", editFavoriteList);

mangaRouter.delete("/deleteList", deleteFavoriteList);

mangaRouter.get("/mangaDetail", getMangaDetail);

mangaRouter.post("/createList", createNewFavoriteList);