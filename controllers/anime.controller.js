import Anime from "../models/anime.model";

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

const transformData = (data) => {
  let newArray = [];
  let value;
  for (let property of data) {
    value = property;
    newArray = [...value, newArray];
  }
  return newArray;
}

export const setFavorite = () => {};

export const removeFavorite = () => {};

export const getResults = ((req, res) => {
  Anime.find().then(results => {
    res.json(results)
  });
});
