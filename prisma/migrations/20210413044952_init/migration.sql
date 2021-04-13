-- CreateTable
CREATE TABLE "anime" (
    "id" SERIAL NOT NULL,
    "idMal" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "meanScore" INTEGER NOT NULL,
    "genres" TEXT[],
    "source" TEXT NOT NULL,
    "synonyms" TEXT[],
    "coverImage" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manga" (
    "id" SERIAL NOT NULL,
    "idMal" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "meanScore" INTEGER NOT NULL,
    "genres" TEXT[],
    "source" TEXT NOT NULL,
    "synonyms" TEXT[],
    "coverImage" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "animeList" INTEGER[],
    "mangaList" INTEGER[],

    PRIMARY KEY ("id")
);
