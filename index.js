import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser"
import mongoose from "mongoose";

import { apiRouter } from "./routes/api.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));

app.use("/api", apiRouter);

// app.use("/login", authRouter);

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
