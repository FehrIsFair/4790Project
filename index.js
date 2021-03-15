import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { apiRouter } from "./routes/api.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api", apiRouter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

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
