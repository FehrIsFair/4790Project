import express from "express";
import path from "path"
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import apiRouter from "./routes/api.route.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(express.static(path.join(__dirname, "client/build")));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api", apiRouter);

app.use((req, res, next) => {
  res.status(404).json({
    Message: "route not found see the readme file.",
  });
});

mongoose
  .connect(`${process.env.CONNECTION_STRING}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
  });