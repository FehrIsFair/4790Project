/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ClickInput: { // input type
    idMal: number; // Int!
  }
  ClientDeleteInput: { // input type
    id: number; // Int!
  }
  ClientEditInput: { // input type
    animeList: number[]; // [Int!]!
    id: number; // Int!
    mangaList: number[]; // [Int!]!
    uid: string; // String!
  }
  ClientLoadInput: { // input type
    uid: string; // String!
  }
  ClientSaveInput: { // input type
    animeList: number[]; // [Int!]!
    mangaList: number[]; // [Int!]!
    uid: string; // String!
  }
  SearchInput: { // input type
    SearchString: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Anime: { // root type
    coverImage: string; // String!
    description: string; // String!
    genres: string[]; // [String!]!
    id: number; // Int!
    idMal: number; // Int!
    meanScore: number; // Int!
    source: string; // String!
    synonyms: string[]; // [String!]!
    title: string; // String!
  }
  List: { // root type
    animeList: number[]; // [Int!]!
    id: number; // Int!
    mangaList: number[]; // [Int!]!
    uid: string; // String!
  }
  Manga: { // root type
    coverImage: string; // String!
    description: string; // String!
    genres: string[]; // [String!]!
    id: number; // Int!
    idMal: number; // Int!
    meanScore: number; // Int!
    source: string; // String!
    synonyms: string[]; // [String!]!
    title: string; // String!
  }
  Mutation: {};
  Query: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Anime: { // field return type
    coverImage: string; // String!
    description: string; // String!
    genres: string[]; // [String!]!
    id: number; // Int!
    idMal: number; // Int!
    meanScore: number; // Int!
    source: string; // String!
    synonyms: string[]; // [String!]!
    title: string; // String!
  }
  List: { // field return type
    animeList: number[]; // [Int!]!
    id: number; // Int!
    mangaList: number[]; // [Int!]!
    uid: string; // String!
  }
  Manga: { // field return type
    coverImage: string; // String!
    description: string; // String!
    genres: string[]; // [String!]!
    id: number; // Int!
    idMal: number; // Int!
    meanScore: number; // Int!
    source: string; // String!
    synonyms: string[]; // [String!]!
    title: string; // String!
  }
  Mutation: { // field return type
    deleteList: NexusGenRootTypes['List'] | null; // List
    editList: NexusGenRootTypes['List'] | null; // List
    saveList: NexusGenRootTypes['List'] | null; // List
    searchAnime: Array<NexusGenRootTypes['Anime'] | null> | null; // [Anime]
    searchManga: Array<NexusGenRootTypes['Manga'] | null> | null; // [Manga]
  }
  Query: { // field return type
    allAnime: NexusGenRootTypes['Anime'][]; // [Anime!]!
    allManga: NexusGenRootTypes['Manga'][]; // [Manga!]!
    singleAnime: Array<NexusGenRootTypes['Anime'] | null> | null; // [Anime]
    singleList: Array<NexusGenRootTypes['List'] | null> | null; // [List]
    singleManga: Array<NexusGenRootTypes['Manga'] | null> | null; // [Manga]
  }
}

export interface NexusGenFieldTypeNames {
  Anime: { // field return type name
    coverImage: 'String'
    description: 'String'
    genres: 'String'
    id: 'Int'
    idMal: 'Int'
    meanScore: 'Int'
    source: 'String'
    synonyms: 'String'
    title: 'String'
  }
  List: { // field return type name
    animeList: 'Int'
    id: 'Int'
    mangaList: 'Int'
    uid: 'String'
  }
  Manga: { // field return type name
    coverImage: 'String'
    description: 'String'
    genres: 'String'
    id: 'Int'
    idMal: 'Int'
    meanScore: 'Int'
    source: 'String'
    synonyms: 'String'
    title: 'String'
  }
  Mutation: { // field return type name
    deleteList: 'List'
    editList: 'List'
    saveList: 'List'
    searchAnime: 'Anime'
    searchManga: 'Manga'
  }
  Query: { // field return type name
    allAnime: 'Anime'
    allManga: 'Manga'
    singleAnime: 'Anime'
    singleList: 'List'
    singleManga: 'Manga'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    deleteList: { // args
      data: NexusGenInputs['ClientDeleteInput']; // ClientDeleteInput!
    }
    editList: { // args
      data: NexusGenInputs['ClientEditInput']; // ClientEditInput!
    }
    saveList: { // args
      data: NexusGenInputs['ClientSaveInput']; // ClientSaveInput!
    }
    searchAnime: { // args
      data: NexusGenInputs['SearchInput']; // SearchInput!
    }
    searchManga: { // args
      data: NexusGenInputs['SearchInput']; // SearchInput!
    }
  }
  Query: {
    singleAnime: { // args
      userUniqueInput: NexusGenInputs['ClickInput']; // ClickInput!
    }
    singleList: { // args
      userUniqueInput: NexusGenInputs['ClientLoadInput']; // ClientLoadInput!
    }
    singleManga: { // args
      userUniqueInput: NexusGenInputs['ClickInput']; // ClickInput!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}