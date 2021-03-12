import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { animeRouter } from "./routes/anime.route.js";
import { mangaRouter } from "./routes/manga.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.json());

app.use("/anime", animeRouter);

app.use("/manga", mangaRouter);

app.use((req, res, next) => {
  res.status(404).json({
    Message: "route not found see the readme file."
  });
})

const main = async () => {
  await mongoose.connect(`${process.env.CONNECTION_STRING}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
};

main();
