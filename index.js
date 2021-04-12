// import express from "express";
const express = require("express");
// import path from "path"
// import * as dotenv from "dotenv";
const dotenv = require("dotenv");
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";
const cors = require("cors");
// import seedrandom from "seedrandom";

const { apiRouter } = require( "./routes/api.route.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//app.use(express.static("public"));

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

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
