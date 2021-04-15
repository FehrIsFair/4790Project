const {
  intArg,
  makeSchema,
  nonNull,
  inputObjectType,
  arg,
  objectType,
  stringArg,
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
        return context.prisma.manga.findMany();
      },
    });
    t.list.field("singleList", {
      type: "List",
      args: {
        uid: nonNull(stringArg()),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.list.findMany({
          where: {
            uid: args.uid,
          },
        });
      },
    });
    t.list.field("listById", {
      type: "List",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.list.findUnique({
          where: {
            id: args.id
          }
        });
      },
    });
    t.list.field("singleAnime", {
      type: "Anime",
      args: {
        idMal: nonNull(intArg()),
      },
      resolve: (_parent, _args, context) => {
        return context.prisma.anime.findMany({
          where: {
            idMal: _args.idMal,
          },
        });
      },
    });
    t.list.field("singleManga", {
      type: "Manga",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, _args, context) => {
        return context.prisma.manga.findMany({
          where: {
            idMal: _args.idMal,
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
        searchQuery: stringArg(),
      },
      resolve: (_, args, context) => {
        return context.prisma.anime.findMany({
          where: {
            title: {
              contains: args.searchQuery,
            },
          }
        })
      },
    });

    t.list.field("searchManga", {
      type: "Manga",
      args: {
        searchQuery: stringArg(),
      },
      resolve: (_, args, context) => {
        return context.prisma.anime.findMany({
          where: {
            title: {
              contains: args.searchQuery,
            },
          },
        })
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
          data: {
            animeList: args.data.animeList,
            mangaList: args.data.mangaList,
          },
          where: {
            id: args.data.id,
          },
        });
      },
    });

    t.field("deleteList", {
      type: "List",
      args: {
        id: nonNull(intArg())
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
    t.nonNull.string("type");
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
    t.nonNull.string("type");
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
    t.nonNull.list.nonNull.int("animeList");
    t.nonNull.list.nonNull.int("mangaList");
  },
});

const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Anime,
    Manga,
    List,
    ClientEditInput,
    ClientSaveInput,
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