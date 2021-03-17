import express from "express";
import * as dotenv from "dotenv";
// import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import seedrandom from "seedrandom";

import { apiRouter } from "./routes/api.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));

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
