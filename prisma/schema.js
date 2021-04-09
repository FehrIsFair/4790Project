import { title } from "node:process";

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
            type: "ClientLoadInput",
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
            type: "ClickInput",
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
            type: "ClickInput",
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
        data: notNull(
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
    t.field('title', {
      type: 'Title',
      resolve: (parent, _, context) => {
        return context.prisma.title
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .title();
      },
    }); // actually object
    t.nonNull.string("description");
    t.nonNull.int("meanScore");
    t.nonNull.list.nonNull.string("genres"); // actually a string array
    t.nonNull.string("source");
    t.nonNull.list.nonNull.string("synonyms");
    t.field('coverImage', {
      type: 'CoverImage',
      resolve: (parent, _, context) => {
        return context.prisma.coverImage
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .coverImage();
      },
    });
  },
});

const Manga = objectType({
  name: "Manga",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("idMal");
    t.field('title', {
      type: 'Title',
      resolve: (parent, _, context) => {
        return context.prisma.title
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .title();
      },
    });
    t.nonNull.string("description");
    t.nonNull.int("meanScore");
    t.nonNull.list.nonNull.string("genres"); // actually a string array
    t.nonNull.string("source");
    t.nonNull.list.nonNull.string("synonyms");
    t.field('coverImage', {
      type: 'CoverImage',
      resolve: (parent, _, context) => {
        return context.prisma.coverImage
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .coverImage();
      },
    });
  },
});

const Title = objectType({
  name: "Title",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("romanji");
    t.nonNull.string("english");
    t.nonNull.string("native");
    t.nonNull.string("userPreferred");
  }
});

const CoverImage = objectType({
  name: "Title",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("extraLarge");
    t.nonNull.string("large");
    t.nonNull.string("medium");
    t.nonNull.string("color");
  }
});;

const List = objectType({
  name: "List",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("uid");
    t.nonNull.list.nonNull.int("animeList");
    t.nonNull.list.nonNull.int("mangaList"); 
  },
});

const SearchInput = createObjectType({
  name: "SearchInput",
  definition(t) {
    t.nonNull.string('SearchString')
  }
});

const ClientSaveInput = createObjectType({
  name: "ClientSaveInput",
  definition(t) {
    t.nonNull.string("uid");
    t.nonNull.list.nonNull.int("animeList");
    t.nonNull.list.nonNull.int("mangaList");
  }
});

const ClientEditInput = createObjectType({
  name: "ClientEditInput",
  definition(t) {
    t.nonNull.int("id")
    t.nonNull.string("uid");
    t.nonNull.list.nonNull.int("animeList");
    t.nonNull.list.nonNull.int("mangaList");
  }
});

const ClientLoadInput = createObjectType({
  name: "ClientLoadInput",
  definition(t) {
    t.nonNull.string("uid");
  }
});

const ClickInput = createObjectType({
  name: "ClickInput",
  definition(t) {
    t.nonNull.int("idMal");
  }
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
