// It made me do this on my machine.
import {Router} from "express";

import {
  getAnime,
  getAnimeByMalId,
  getList,
  getManga,
  getMangaDetail,
  editFavoriteList,
  deleteFavoriteList,
  createNewFavoriteList,
  getAnimeDetail,
  getMangaByMalId,
} from "../controllers/api.controller.js";

const apiRouter = Router();

apiRouter.get("/Anime", getAnime);
apiRouter.get("/Manga", getManga);
apiRouter.get("/List/:uid", getList);
apiRouter.get("/Anime/:mal_id", getAnimeByMalId);
apiRouter.get("/Manga/:mal_id", getMangaByMalId);
apiRouter.get("/Manga/Detail/:mal_id", getMangaDetail);
apiRouter.get("/Anime/Detail/:mal_id", getAnimeDetail);
apiRouter.put("/EditList", editFavoriteList);
apiRouter.delete("/DeleteList/:_id", deleteFavoriteList);
apiRouter.post("/CreateList", createNewFavoriteList);

export default apiRouter