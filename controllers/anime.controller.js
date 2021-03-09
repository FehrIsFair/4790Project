import Anime from "../models/anime.model";
import axios from "axios"

// again I can get rid of this later when we move to graphql
const jikanApi = axios.create({
  baseURL: "https://api.jikan.moe/v3/",
});

// First get endpoint
export const getAnime = (req, res) => {
  const anime = new Anime({
    title: req.body.title,
    rating: req.body.score,
    synopsis: req.body.synopsis,
    promoArtURL: req.body.image_url,
    mal_id: req.body.mal_id,
  });
  console.log(anime);
  anime.save();
  res.json(anime);
};

// This is just how the api I was using before worked. When we get to GraphQL, I'll be able to get rid of this.
export const getAnimeDetail = (req, res, mal_id) => {
  jikanApi.get
}

export const setFavorite = () => {};

// another set
export const removeFavorite = () => {};

// third get endpoint
export const getResults = ((req, res) => {
  Anime.find().then(results => {
    res.json(results)
  });
});
