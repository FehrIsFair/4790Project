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
const { GraphQLDateTime } = require("graphql-iso-date");

const DateTime = asNexusMethod(GraphQLDateTime, "date");

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
    t.list.field("searchResults", {
      type: "Anime",
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

    t.list.field("searchResults", {
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
            type: "PostCreateInput",
          })
        )
      },
      resolve: (_, args, context) => {
        return context.prisma.post.create({
          data: {
            uid: args.data.uid,
            animeList: args.data.animeList,
            mangaList: args.data.mangaList,
          }
        })
      }
    })

    t.field("deleteList", {
      type: "List",
      args: {
        data: nonNull(
          arg({
            id: nonNull(intArg())
          })
        )
      },
      resolve: (_, args, context) => {
        return context.prisma.post.delete({
          where: {
            id: args.id
          }
        })
      }
    })
  },
});

const Anime = objectType({
  name: "Anime",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("idMal");
    t.nonNull.string("title");// actually object
    t.nonNull.string("description");
    t.nonNull.int("meanScore");
    t.nonNull.string("genres");// actually a string array
    t.nonNull.string("source");
    t.nonNull.string("synonyms");
    t.nonNull.string("coverImage");// actually object
  }
});

const Anime = objectType({
  name: "Manga",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("idMal");
    t.nonNull.string("title");// actually object
    t.nonNull.string("description");
    t.nonNull.int("meanScore");
    t.nonNull.string("genres");// actually a string array
    t.nonNull.string("source");
    t.nonNull.string("synonyms");
    t.nonNull.string("coverImage");// actually object
  }
});

const Anime = objectType({
  name: "Anime",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("uid");
    t.nonNull.int("animeList");// actually array
    t.nonNull.int("mangaList");// actually array
  }
});