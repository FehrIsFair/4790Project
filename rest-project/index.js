import express from "express";
import axios from "axios";

const app = express();
const kitsuAPI = axios.create({
  baseURL: "https://kitsu.io/api/edge",
});
const port = 5000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api", (req, res) => {
  kitsuAPI.get("/anime/1").then((data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
