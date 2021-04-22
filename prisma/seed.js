const {PrismaClient} = require("@prisma/client");


const animeData = require("./data/Anime.json");
const mangaData = require("./data/Manga.json");

const listData = require("./data/List.json");

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");
  for (const i of animeData) {
    try {
      let constructedAnime = {
        idMal: i.idMal,
        title: i.title.userPreferred,
        description: i.description,
        meanScore: i.meanScore,
        genres: i.genres,
        source: i.source,
        synonyms: i.synonyms,
        coverImage: i.coverImage.large,
        type: i.type,
      };
      const anime = await prisma.anime.create({
        data: constructedAnime,
      });
    } catch (error) {
      console.log(`Error when creating record: ${error}`);
    }
  }
  for (const i of mangaData) {
    try {
      let constructedManga = {
        idMal: i.idMal,
        title: i.title.userPreferred,
        description: i.description,
        meanScore: i.meanScore,
        source: i.source,
        synonyms: i.synonyms,
        coverImage: i.coverImage.large,
        type: i.type,
      };
      const manga = await prisma.manga.create({
        data: constructedManga,
      });
    } catch (error) {
      console.log(`Error when creating record: ${error}`);
    }
  }
  for (const i of listData) {
    try {
      const list = await prisma.list.create({
        data: i,
      });
    } catch (error) {
    console.log(`Error when createing record: ${error}`)
  }
  } 
}

main().catch((e) => {
  console.log(`Caught Error ${e}`)
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})