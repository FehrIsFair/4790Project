// const {PrismaClient} = require("prisma");
import {PrismaClient} from "prisma"

// const animeData = require("../data/Anime.json");
// const mangaData = require("../data/Manga.json");
// const listData = require("../data/List.json");

import animeData from "../data/Anime.json"
import mangaData from "../data/Manga.json"
import Title from "../data/Title.json"
import CoverImage from "../data/CoverImage.json"
import listData from "../data/List.json"

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");
  for (const i of Title) {
    const title = await prisma.Title.create({
      data: i
    })
  }
  for (const i of CoverImage) {
    const title = await prisma.CoverImage.create({
      data: i
    })
  }
  for (const i of animeData) {
    const anime = await prisma.Anime.create({
      data: constructedAnime
    });
  }
  for (const i of mangaData) {
    const anime = await prisma.Manga.create({
      data: i
    });
  }
  for (const i of listData) {
    const list = await prisma.List.create({
      data: i,
    })
  }
}

main().catch((e) => {
  console.log(`Caught Error ${e}`)
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})