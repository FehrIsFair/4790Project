// It made me do this on my machine.
import pkg from "express";

import {
  getAnime,
  getAnimeDetail,
  getList,
  getManga,
  getMangaDetail,
  editFavoriteList,
  deleteFavoriteList,
  createNewFavoriteList,
} from "../controllers/api.controller.js";

const { Router } = pkg;

export const apiRouter = Router();

apiRouter.get("/Anime", getAnime);
apiRouter.get("/Manga", getManga);
apiRouter.get("/List", getList);
apiRouter.get("/AnimeDetail", getAnimeDetail);
apiRouter.get("/MangaDetail", getMangaDetail);
apiRouter.put("/EditList", editFavoriteList);
apiRouter.delete("/DeleteList", deleteFavoriteList);
apiRouter.post("/CreateList", createNewFavoriteList);