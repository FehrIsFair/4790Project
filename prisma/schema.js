const {
  intArg,
  makeSchema,
  nonNull,
  inputObjectType,
  arg,
  objectType,
} = require("nexus");

const Query = objectType({
  name: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allAnime", {
      type: "Anime",
      resolve: (_parent, _args, context) => {
        return context.prisma.anime.findMany();
      },
    });
    t.nonNull.list.nonNull.field("allManga", {
      type: "Manga",
      resolve: (_parent, _args, context) => {
        return context.prisma.aanga.findMany();
      },
    });
    t.list.field("singleList", {
      type: "List",
      args: {
        userUniqueInput: nonNull(
          arg({
            type: "ClientLoadInput",
          })
        ),
      },
      resolve: (_parent, _args, context) => {
        return context.prisma.list.findUnique({
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
            type: "ClickInput",
          })
        ),
      },
      resolve: (_parent, _args, context) => {
        return context.prisma.list.findUnique({
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
            type: "ClickInput",
          })
        ),
      },
      resolve: (_parent, _args, context) => {
        return context.prisma.list.findUnique({
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
        data: nonNull(
          arg({
            type: "SearchInput",
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
        data: nonNull(
          arg({
            type: "SearchInput",
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
            type: "ClientSaveInput",
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
            type: "ClientEditInput",
          })
        ),
      },
      resolve: (_, args, context) => {
        return context.prisma.list.update({
          // not sure if this is correct.
          data: {
            id: args.data.id,
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
            type: "ClientDeleteInput",
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
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.int("meanScore");
    t.nonNull.list.nonNull.string("genres"); // actually a string array
    t.nonNull.string("source");
    t.nonNull.list.nonNull.string("synonyms");
    t.nonNull.string("coverImage");
  },
});

const Manga = objectType({
  name: "Manga",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("idMal");
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.int("meanScore");
    t.nonNull.list.nonNull.string("genres"); // actually a string array
    t.nonNull.string("source");
    t.nonNull.list.nonNull.string("synonyms");
    t.nonNull.string("coverImage");
  },
});

const List = objectType({
  name: "List",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("uid");
    t.nonNull.list.nonNull.int("animeList");
    t.nonNull.list.nonNull.int("mangaList");
  },
});

const SearchInput = inputObjectType({
  name: "SearchInput",
  definition(t) {
    t.nonNull.string("SearchString");
  },
});

const ClientSaveInput = inputObjectType({
  name: "ClientSaveInput",
  definition(t) {
    t.nonNull.string("uid");
    t.nonNull.list.nonNull.int("animeList");
    t.nonNull.list.nonNull.int("mangaList");
  },
});

const ClientEditInput = inputObjectType({
  name: "ClientEditInput",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("uid");
    t.nonNull.list.nonNull.int("animeList");
    t.nonNull.list.nonNull.int("mangaList");
  },
});

const ClientDeleteInput = inputObjectType({
  name: "ClientDeleteInput",
  definition(t) {
    t.nonNull.int("id");
  },
});

const ClientLoadInput = inputObjectType({
  name: "ClientLoadInput",
  definition(t) {
    t.nonNull.string("uid");
  },
});

const ClickInput = inputObjectType({
  name: "ClickInput",
  definition(t) {
    t.nonNull.int("idMal");
  },
});

const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Anime,
    Manga,
    List,
    SearchInput,
    ClientEditInput,
    ClientLoadInput,
    ClientSaveInput,
    ClientDeleteInput,
    ClickInput,
  ],
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
  schema: schema
}