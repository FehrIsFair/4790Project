const {PrismaClient} = require("@prisma/client");


const animeData = require("../data/Anime.json");
const mangaData = require("../data/Manga.json");
const titleData = require("../data/Title.json");
const coverImageData = require("../data/CoverImage.json");
const listData = require("../data/List.json");

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");
  for (const i of animeData) {
    try {
      for (const i of animeData) {
        const title = await prisma.title.create({
          data: i.title,
        });
        const coverImage = await prisma.coverImage.create({
          data: i.coverImage,
        });
        let constructedAnime = {
          idMal: i.idMal,
          titleID: title.id,
          description: i.description,
          meanScore: i.meanScore,
          genres: i.genres,
          synonyms: i.synonyms,
          source: i.source,
          coverImageID: coverImage.id,
        };
        const anime = await prisma.anime.create({
          data: constructedAnime
        });
      }
      for (const i of mangaData) {
        const title = await prisma.title.create({
          data: i.title,
        });
        const coverImage = await prisma.coverImage.create({
          data: i.coverImage,
        });
        let constructedManga = {
          idMal: i.idMal,
          titleID: title.id,
          description: i.description,
          meanScore: i.meanScore,
          genres: i.genres,
          synonyms: i.synonyms,
          source: i.source,
          coverImageID: coverImage.id,
        };
        const anime = await prisma.manga.create({
          data: constructedManga
        });
      }
      for (const i of listData) {
        const list = await prisma.list.create({
          data: i,
        })
      }
    } catch (error) {
      console.log(`Error when creating record: ${error}`);
    }
  }
}

main().catch((e) => {
  console.log(`Caught Error ${e}`)
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})