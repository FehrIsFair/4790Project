import { Router } from "express";

import {
  getManga,
  getList,
  getMangaDetail,
  editFavoriteList,
  deleteFavoriteList,
} from "../controllers/manga.controller";

export const mangaRouter = Router();

mangaRouter.get("/", getManga);

mangaRouter.get("/mangaList", getList);

mangaRouter.put("/editList", editFavoriteList);

mangaRouter.delete("/deleteList", deleteFavoriteList);

mangaRouter.get("/mangaDetail", getMangaDetail);
