import express from "express";
import dotenv from "dotenv";

import { apiRouter } from "./routes/api.route.js";

const app = express();
const port = process.env.PORT || 5000;

app.set("view engine", "pug");
app.set("views", "views")

app.use(express.static("public"));

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
