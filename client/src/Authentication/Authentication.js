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
  query {
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
  query {
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
// This has been immencely simplified to accomodate GraphQL
export const Authentication = createContext({
  clickedAnime: "",
  favoriteList: [],
});

// This is the Provider and lets the rest of the compoments access things globally without needing to pass a prop everywhere.
const AuthProvider = ({ children }) => {
  // Here are my hooks that trigger states and keep track of things accross the app.
  const [clicked, setClicked] = useState();
  const [userName, setUserName] = useState(null);
  const [userList, setUserList] = useState();
  const [isDelete, setIsDelete] = useState(false);

  // Lazy Queries are your friend
  const { 
    loading: loadingList, 
    error: listError, 
    data: listData } = useQuery(GET_LISTS);
  const {
    loading: loadingAnime,
    error: animeError,
    data: animeData,
  } = useQuery(ALL_ANIME);
  const {
    loading: loadingManga,
    error: mangaError,
    data: mangaData,
  } = useQuery(ALL_MANGA);

  // Mutations
  const [saveList] = useMutation(SAVE_LIST);
  const [editList] = useMutation(EDIT_LIST);
  const [deleteList] = useMutation(DELETE_LIST);

  const userNameHandler = (_userName) => {
    setUserName(_userName);
    listHandler(_userName);
  };

  const deleteHandler = (bool) => {
    setIsDelete(bool);
  };

  const determineIfPutPostDelete = () => {
    const lists = listData.allLists;
    if (isDelete) {
      try {
        deleteList({ variables: { id: userList.id } });
      } catch (err) {
        console.log(`${err}`);
      }
    } else if (findList(lists)) {
      try {
        editList({
          variables: {
            id: userList.id,
            animeList: userList.animeList,
            mangaList: userList.mangaList,
          },
        });
      } catch (err) {
        console.log(`${err}`);
      }
    } else {
      saveList({
        variables: {
          uid: userName,
          animeList: userList.animeList,
          mangaList: userList.mangaList,
        },
      });
    }
  };

  const findList = (_lists) => {
    for (let value of _lists) {
      if (value.id === userList.id) {
        return true;
      }
    }
    return false;
  };

  const listHandler = (_userName) => {
    const lists = listData.allLists;
    for (let value of lists) {
      if (value.uid === _userName) {
        setUserList({ ...value });
        break;
      }
    }
    if (!userList) {
      setUserList({
        uid: _userName,
        animeList: [],
        mangaList: [],
      });
    }
  };

  const logOutHandler = () => {
    determineIfPutPostDelete();
    setUserName(null);
  };

  // This adds to the favorite list.
  const addToFavoriteList = async (idMal, type) => {
    let dummyState = userList;
    if (type === "ANIME") {
      dummyState.animeList.push(idMal);
    } else {
      dummyState.mangaList.push(idMal);
    }
    setUserList({ ...dummyState });
  };

  // Searches the list and returns a bool that determines if the add button is a remove button and vice versa.
  const favoriteListSearcher = (idMal, type) => {
    if (type === "ANIME") {
      for (let value of userList.animeList) {
        if (value === idMal) {
          return true;
        }
      }
    } else {
      for (let value of userList.mangaList) {
        if (value === idMal) {
          return true;
        }
      }
    }
    return false;
  };
  // This removes an anime from the list by looking for the anime of the same ID
  const deleteFromFavoriteList = (idMal, type) => {
    let dummyState = userList;
    let newArray = [];
    if (type === "ANIME") {
      for (let value of dummyState.animeList) {
        if (value !== idMal) {
          newArray = [value, newArray];
        }
      }
      dummyState.animeList = newArray;
    } else {
      for (let value of dummyState.mangaList) {
        if (value !== idMal) {
          newArray = [value, newArray];
        }
      }
      dummyState.mangaList = newArray;
    }
    setUserList(dummyState);
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
        addFavorite: addToFavoriteList,
        removeFavorite: deleteFromFavoriteList,
        searchList: favoriteListSearcher,
        userName: userName,
        clicked: clicked,
        allAnime: animeData,
        allManga: mangaData,
        allLists: listData,
        loadingAnime: loadingAnime,
        loadingLists: loadingList,
        loadingManga: loadingManga,
        deleteList: isDelete,
        deleteHandler: deleteHandler,
        logout: logOutHandler,
      }}
    >
      {children}
    </Authentication.Provider>
  );
};
export default AuthProvider;
