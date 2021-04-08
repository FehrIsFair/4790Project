const {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} = require("nexus");

const Query = objectType({
  name: "Query",
  definition(t) {
    t.notNull.list.nonNull.field("allAnime", {
      type: "Anime",
      resolve: (_parent, _args, context) => {
        return context.prisma.Anime.findMany();
      },
    });
    t.nonNull.list.nonNull.field("allManga", {
      type: "Manga",
      resolve: (_parent, _args, context) => {
        return context.prisma.Manga.findMany();
      },
    });
    t.list.field("singleList", {
      type: "List",
      args: {
        userUniqueInput: nonNull(
          arg({
            type: "UserUniqueInput",
          })
        ),
      },
      resolve: (_parent, _args, context) => {
        return context.prisma.List.findUnique({
          where: {
            uid: args.userUniqueInput.uid,
          },
        });
      },
    });
    t.list.field("singleAnime", {
      type: "Anime",
      args: {
        userUniqueInput: nonNull(
          arg({
            type: "UserUniqueInput",
          })
        ),
      },
      resolve: (_parent, _args, context) => {
        return context.prisma.List.findUnique({
          where: {
            idMal: args.userUniqueInput.idMal,
          },
        });
      },
    });
    t.list.field("singleManga", {
      type: "Manga",
      args: {
        userUniqueInput: nonNull(
          arg({
            type: "UserUniqueInput",
          })
        ),
      },
      resolve: (_parent, _args, context) => {
        return context.prisma.List.findUnique({
          where: {
            idMal: args.userUniqueInput.idMal,
          },
        });
      },
    });
  },
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.list.field("searchAnime", {
      type: "Anime",
      args: {
        data: notNull(
          arg({
            type: "AnimeSearchInput",
          })
        ),
      },
      resolve: (_, args, context) => {
        const searchData = args.data.results
          ? args.data.results.map((result) => {
              return {
                title: result.title,
                meanScore: result.meanScore,
                coverImage: result.coverImage,
                description: result.description,
              };
            })
          : [];
      },
    });

    t.list.field("searchManga", {
      type: "Manga",
      args: {
        data: notNull(
          arg({
            type: "UserCreateInput",
          })
        ),
      },
      resolve: (_, args, context) => {
        const searchData = args.data.results
          ? args.data.results.map((result) => {
              return {
                title: result.title,
                meanScore: result.meanScore,
                coverImage: result.coverImage,
                description: result.description,
              };
            })
          : [];
      },
    });

    t.field("saveList", {
      type: "List",
      args: {
        data: nonNull(
          arg({
            type: "ClientInput",
          })
        ),
      },
      resolve: (_, args, context) => {
        return context.prisma.list.create({
          data: {
            uid: args.data.uid,
            animeList: args.data.animeList,
            mangaList: args.data.mangaList,
          },
        });
      },
    });

    t.field("editList", {
      type: "List",
      args: {
        data: nonNull(
          arg({
            type: "ClientInput",
          })
        ),
      },
      resolve: (_, args, context) => {
        return context.prisma.list.update({
          // not sure if this is correct.
          data: {
            uid: args.data.uid,
            animeList: args.data.animeList,
            mangaList: args.data.mangaList,
          },
        });
      },
    });

    t.field("deleteList", {
      type: "List",
      args: {
        data: nonNull(
          arg({
            id: nonNull(intArg()),
          })
        ),
      },
      resolve: (_, args, context) => {
        return context.prisma.list.delete({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

const Anime = objectType({
  name: "Anime",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("idMal");
    t.nonNull.string("title"); // actually object
    t.nonNull.string("description");
    t.nonNull.int("meanScore");
    t.nonNull.string("genres"); // actually a string array
    t.nonNull.string("source");
    t.nonNull.string("synonyms");
    t.nonNull.string("coverImage"); // actually object
  },
});

const Manga = objectType({
  name: "Manga",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("idMal");
    t.nonNull.string("title"); // actually object
    t.nonNull.string("description");
    t.nonNull.int("meanScore");
    t.nonNull.string("genres"); // actually a string array
    t.nonNull.string("source");
    t.nonNull.string("synonyms");
    t.nonNull.string("coverImage"); // actually object
  },
});

const List = objectType({
  name: "List",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("uid");
    t.nonNull.int("animeList"); // actually array
    t.nonNull.int("mangaList"); // actually array
  },
});

const schema = makeSchema({
  types: [Query, Mutation, Anime, Manga, List],
  outputs: {
    schema: __dirname + "/..schema.graphql",
    typegen: __dirname + "generated/nexus.ts",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});

module.exports = {
  shemea: schema,
};

export default schema
