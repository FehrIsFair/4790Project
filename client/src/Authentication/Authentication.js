import React, { useState, createContext } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_LISTS = gql`
  query {
    singleList {
      id
      uid
      animeList
      mangaList
    }
  }
`;

const ALL_ANIME = gql`
  query{
    allAnime {
      idMal
      title
      description
      genres
      synonyms
      coverImage
      meanScore
      source
    }
  }
`;

const ALL_MANGA = gql`
  query{
    allManga {
      idMal
      title
      description
      genres
      synonyms
      coverImage
      meanScore
      source
    }
  }
`;

const DELETE_LIST = gql`
  mutation DeleteList($id: Number!) {
    deleteList(id: $id) {
      id
    }
  }
`;

const EDIT_LIST = gql`
  mutation EditList($id: Number!, $animeList: Array!, $mangaList: Array!) {
    editList(id: $id, animeList: $animeList, mangaList: $mangaList) {
      animeList
      mangaList
    }
  }
`;

const SAVE_LIST = gql`
  mutation SaveList($uid: String!, $animeList: Array!, $mangaList: Array!) {
    saveList(uid: $uid, animeList: $animeList, mangaList: $mangaList) {
      id
      uid
      animeList
      mangaList
    }
  }
`;

// This is just the initial state of the authentication.

// This is the context of the entire application.
// It is what allows all views to be able to load what it needs to load.
// Like Anime.js, gets the clickedAnime prop to load the anime the user requested.
// It also handles the search and favorites. As well as the authentication process.
export const Authentication = createContext({
  clickedAnime: "",
  favoriteList: [],
});

// This is the Provider and lets the rest of the compoments access things globally without needing to pass a prop everywhere.
const AuthProvider = ({ children }) => {
  // Here are my hooks that trigger states and keep track of things accross the app.
  const [clicked, setClicked] = useState();
  const [userName, setUserName] = useState(null);

  // Lazy Queries are your friend
  const {loading: loadingList, error: listError, data: listData } = useQuery(GET_LISTS);
  const {loading: loadingAnime, error: animeError, data: animeData} = useQuery(ALL_ANIME);
  const {loading: loadingManga, error: mangaError, data: mangaData} = useQuery(ALL_MANGA);

  // Mutations
  const [saveList] = useMutation(SAVE_LIST);
  const [editList] = useMutation(EDIT_LIST);
  const [deleteLists] = useMutation(DELETE_LIST);

  const userNameHandler = (_userName) => {
    setUserName(_userName);
  }

  const logOutHandler = () => {
    setUserName(null)
  }

  // const setupList = async () => {
  //   if (!loadingList) {
  //     setupAnimeList(listData);
  //     setupMangaList(listData);
  //   }
  // };

  // const setupAnimeList = async (data) => {
  //   let animeArray = [];
  //   for (let value of data.animeList) {
  //     await getAnime({ variables: value });
  //     animeArray = [...animeArray, animeData];
  //   }
  //   setList([...animeArray]);
  // };

  // const setupMangaList = async (data) => {
  //   let mangaArray = [];
  //   for (let value of data.mangaList) {
  //     await getManga({ variables: value });
  //     mangaArray = [...mangaArray, mangaData];
  //   }
  //   setMangaList([...mangaArray]);
  // };

  // This build the favorite list.
  const favoriteListBuilder = async (anime) => {
    
  };

  // Searches the list and returns a bool that determines if the add button is a remove button and vice versa.
  const favoriteListSearcher = (idMal, type) => {
    
  };
  // This removes an anime from the list by looking for the anime of the same ID
  const favoriteListHandler = (idMal, type) => {
    
  };
  // This makes sure that the clicked anime is remembered after going towards the anime page.
  const setClickedHandler = (click) => {
    setClicked(click);
  };


  return (
    <Authentication.Provider
      value={{
        userNameHandler: userNameHandler,
        click: setClickedHandler,
        addFavorite: favoriteListBuilder,
        removeFavorite: favoriteListHandler,
        searchList: favoriteListSearcher,
        userName: userName,
        clicked: clicked,
        allAnime: animeData,
        allManga: mangaData,
        allLists: listData,
        loadingAnime: loadingAnime,
        loadingLists: loadingList,
        loadingManga: loadingManga,
        logout: logOutHandler,
      }}
    >
      {children}
    </Authentication.Provider>
  );
};
export default AuthProvider;
