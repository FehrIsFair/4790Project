import React, { useState, createContext } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import axios from "axios";

const GET_LISTS = gql`
  query {
    allLists {
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
      type
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
      type
    }
  }
`;

const DELETE_LIST = gql`
  mutation DeleteList($id: Int!) {
    deleteList(id: $id) {
      id
    }
  }
`;

const EDIT_LIST = gql`
  mutation EditList($id: Int!, $animeList: [Int]!, $mangaList: [Int]!) {
    editList(id: $id, data: { animeList: $animeList, mangaList: $mangaList }) {
      id
    }
  }
`;

const SAVE_LIST = gql`
  mutation SaveList($uid: String!, $animeList: [Int]!, $mangaList: [Int]!) {
    saveList(
      data: { uid: $uid, animeList: $animeList, mangaList: $mangaList }
    ) {
      id
    }
  }
`;

// This is the context of the entire application.
// This has been immencely simplified to accomodate GraphQL
export const Authentication = createContext({
  clickedAnime: "",
  favoriteList: [],
});

const authMethod = axios.create({
  baseURL: "http://localhost:6060",
});

// This is the Provider and lets the rest of the compoments access things globally without needing to pass a prop everywhere.
const AuthProvider = ({ children }) => {
  // Here are my hooks that trigger states and keep track of things accross the app.
  const [clicked, setClicked] = useState();
  const [userList, setUserList] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [didSignOut, setDidSignOut] = useState(false);
  const [isAuth, setIsAuth] = useState();
  const [userName, setUserName] = useState();

  // GQL Stuff
  const { loading: loadingList, data: listData } = useQuery(GET_LISTS);
  const { loading: loadingAnime, data: animeData } = useQuery(ALL_ANIME);
  const { loading: loadingManga, data: mangaData } = useQuery(ALL_MANGA);

  // Mutations
  const [saveList] = useMutation(SAVE_LIST);
  const [editList] = useMutation(EDIT_LIST);
  const [deleteList] = useMutation(DELETE_LIST);

  const signIn = async (_username, _password) => {
    const { data } = await authMethod.post("/Auth", {
      UserName: _username,
      Password: _password,
    });
    if (data.auth) {
      listHandler(_username);
      setIsAuth(data.auth);
      setUserName(_username)
      return true;
    } else {
      return false;
    }
  };

  const signUp = async (_username, _password, _confirm) => {
    if (_password === _confirm) {
      const { data } = await authMethod.post("/Create", {
        UserName: _username,
        Password: _password,
      });
      if (data.auth) {
        listHandler(_username);
        setIsAuth(data.auth);
        setUserName(_username);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const deleteHandler = (bool) => {
    setIsDelete(bool);
  };

  const determineIfPutPostDelete = () => {
    debugger;
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
      try {
        saveList({
          variables: {
            uid: userName,
            animeList: userList.animeList,
            mangaList: userList.mangaList,
          },
        });
      } catch (err) {
        console.log(`${err}`);
      }
    }
    setDidSignOut(true);
  };

  const didTheySignOut = () => {
    setDidSignOut(false);
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
    let dataSet = false;
    for (let value of lists) {
      if (value.uid === _userName) {
        setUserList(value);
        dataSet = !dataSet;
      }
    }
    if (!dataSet) {
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
    setIsAuth(false);
  };

  // This adds to the favorite list.
  const addToFavoriteList = async (idMal, type) => {
    let id = userList.id || null;
    let animeArray = [...userList.animeList];
    let mangaArray = [...userList.mangaList];
    if (type === "ANIME") {
      animeArray.push(idMal);
    } else {
      mangaArray.push(idMal);
    }
    setUserList({
      id: id,
      uid: userList.uid,
      animeList: animeArray,
      mangaList: mangaArray,
    });
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
    let dummyState = { ...userList };
    let newArray = [];
    if (type === "ANIME") {
      for (let value of dummyState.animeList) {
        if (value !== idMal) {
          newArray = [value, ...newArray];
        }
      }
      dummyState.animeList = newArray;
    } else {
      for (let value of dummyState.mangaList) {
        if (value !== idMal) {
          newArray = [value, ...newArray];
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
        click: setClickedHandler,
        addFavorite: addToFavoriteList,
        removeFavorite: deleteFromFavoriteList,
        searchList: favoriteListSearcher,
        signOutLogicHandler: didTheySignOut,
        signIn: signIn,
        signUp: signUp,
        clicked: clicked,
        allAnime: animeData,
        allManga: mangaData,
        allLists: listData,
        auth: isAuth,
        loadingAnime: loadingAnime,
        loadingLists: loadingList,
        loadingManga: loadingManga,
        deleteList: isDelete,
        userList: userList,
        didSignOut: didSignOut,
        deleteHandler: deleteHandler,
        logout: logOutHandler,
      }}
    >
      {children}
    </Authentication.Provider>
  );
};
export default AuthProvider;
