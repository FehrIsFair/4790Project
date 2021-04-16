import React, { useState, createContext, useReducer, useEffect } from "react";
import app from "../lib/firebase";
import { useLazyQuery, gql, useMutation } from "@apollo/client";

const GET_LIST = gql`
  query SingleList($uid: String!) {
    singleList(uid: $uid) {
      id
      uid
      animeList
      mangaList
    }
  }
`;

const DELETE_LIST = gql`
  mutation DeleteList($id: Number!) {
    deleteList(id: $id) {
      id
      title
      animeList
      mangaList
    }
  }
`;

const EDIT_LIST = gql`
  mutation EditList($id: Number!, $animeList: Number[]!, $mangaList: Number[]!) {
    editList(id: $id, animeList: $animeList, mangaList: $mangaList) {
      id
      title
      animeList
      mangaList
    }
  }
`;

const SAVE_LIST = gql`
  mutation SaveList($uid: String!, $animeList: Number[]!, $mangaList: Number[]!) {
    saveList(uid: $uid, animeList: $animeList, mangaList: $mangaList) {
      id
      title
      animeList
      mangaList
    }
  }
`;

// This is to make sure if the user is new.
const GET_LIST_BY_ID = gql`
  query ListByID($id: Number!) {
    listById(id: $id) {
      id
      uid
      animeList
      mangaList
    }
  }
`;

const GET_ONE_ANIME = gql`
  query SingleAnime($idMal: Number!) {
    singleAnime(idMal: $idMal) {
      idMal
      title
      description
      meanScore
      coverImage
      type
    }
  }
`;

const GET_ONE_MANGA = gql`
  query SingleAnime($idMal: Number!) {
    singleManga(idMal: $idMal) {
      idMal
      title
      description
      meanScore
      coverImage
      type
    }
  }
`;

// This is just the initial state of the authentication.
const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  favoriteList: [],
  userList: {},
  clickedAnime: "",
  login: () => {},
  logout: () => {},
  signup: () => {},
  click: () => {},
  searchList: () => {},
  addFavorite: () => {},
  getList: () => {},
  loadData: () => {},
  sendData: () => {},
  removeFavorite: () => {},
};

// This reducer returns the state an objecgt based on if the user successfully authenticated.
const reducer = (state, action) => {
  switch (action.type) {
    case "AUTH_STATE_CHANGED": {
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

// This is the context of the entire application.
// It is what allows all views to be able to load what it needs to load.
// Like Anime.js, gets the clickedAnime prop to load the anime the user requested.
// It also handles the search and favorites. As well as the authentication process.
export const Authentication = createContext({
  ...initialAuthState,
  method: "appAuth",
  signInWithGoogle: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  createUserWithEmailAndPassword: () => Promise.resolve(),
  loadAppData: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  sendAppData: () => Promise.resolve(),
  clickedAnime: "",
  favoriteList: [],
});

// This is the Provider and lets the rest of the compoments access things globally without needing to pass a prop everywhere.
const AuthProvider = ({ children }) => {
  // Here are my hooks that trigger states and keep track of things accross the app.
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const [favorite, setFavorite] = useState();
  const [clicked, setClicked] = useState();
  const [list, setList] = useState([]); // animeList
  const [mangaList, setMangaList] = useState([]);
  const [deleteList, setDeleteList] = useState(false);
  const [userList, setUserList] = useState({
    id: null,
    uid: null,
    animeList: [],
    mangaList: [],
  });

  // Lazy Queries are your friend
  const [getList, { loadingList, listData }] = useLazyQuery(GET_LIST);
  const [getNewList, { loadingNewList, newListData }] = useLazyQuery(
    GET_LIST_BY_ID
  );
  const [getAnime, { loadingAnime, animeData }] = useLazyQuery(GET_ONE_ANIME);
  const [getManga, { loadingManga, mangaData }] = useLazyQuery(GET_ONE_MANGA);

  // Mutations
  const [saveList, { saveData }] = useMutation(SAVE_LIST);
  const [editList, { editData }] = useMutation(EDIT_LIST);
  const [deleteLists, { deleteData }] = useMutation(DELETE_LIST);

  // This is the back end stuff.

  const deleteHandler = (bool) => {
    setDeleteList(bool);
  };

  const makeList = async (uid) => {
    await getList({ variables: { uid: uid } });
    setupAnimeList(listData);
    setupMangaList(listData);
    setUserList(listData);
  };

  const setupAnimeList = async (user) => {
    let animeArray = [];
    for (let value of user.animeList) {
      await getAnime({ variables: value });
      animeArray = [...animeArray, animeData];
    }
    setList([...animeArray]);
  };

  const setupMangaList = async (data) => {
    let mangaArray = [];
    for (let value of data.mangaList) {
      await getManga({ variables: value });
      mangaArray = [...mangaArray, mangaData];
    }
    setMangaList([...mangaArray]);
  };

  // This handles the now depricated
  const favoriteHandler = (_favorite) => {
    setFavorite(_favorite);
  };
  // This group handles the sign up and login functinality. Email/Password, Google Account, and hanldes crateing an account with an email and password.
  const signInWithEmailAndPassword = async (email, password) => {
    return app.auth().signInWithEmailAndPassword(email, password);
  };
  const createUserWithEmailAndPassword = async (email, password) => {
    return app.auth().createUserWithEmailAndPassword(email, password);
  };
  const signInWithGoogle = () => {
    const provider = new app.auth.GoogleAuthProvider();
    return app.auth().signInWithPopup(provider);
  };
  // Just the logout function
  const logoutHandler = () => {
    determinePutPostDelete();
    return app.auth().signOut();
  };
  // This build the favorite list.
  const favoriteListBuilder = async (anime) => {
    if (list || mangaList)
      if (anime.type === "ANIME") {
        const { data } = await getAnime({ variables: { idMal: anime.idMal } });
        setList([...list, data]);
      } else {
        const { data } = await getManga({ variables: { idMal: anime.idMal } });
        setMangaList([...mangaList, data]);
      }
  };

  const determinePutPostDelete = async () => {
    let animeArray = [];
    let mangaArray = [];
    let dummyState = userList;
    await getNewList({ variables: { id: userList.id } });
    if (!deleteList) {
      if (!newListData) {
        putList(animeArray, mangaArray, dummyState);
      } else {
        postList(animeArray, mangaArray, dummyState);
      }
    } else {
      if (userList._id) {
        deleteLists({ variables: { id: dummyState.id } });
      }
    }
  };

  const postList = (animeArray, mangaArray, dummyState) => {
    for (let value of list) {
      animeArray.push(value.idMal);
    }
    for (let value of mangaList) {
      mangaArray.push(value.idMal);
    }
    dummyState.animeList = [...animeArray];
    dummyState.mangaList = [...mangaArray];
    saveList({
      variables: {
        uid: dummyState.uid,
        animeList: animeArray,
        mangaList: mangaArray,
      },
    });
  };

  const putList = (animeArray, mangaArray, dummyState) => {
    for (let value of list) {
      animeArray.push(value.mal_id);
    }
    for (let value of mangaList) {
      mangaArray.push(value.mal_id);
    }
    dummyState.animeList = [...animeArray];
    dummyState.mangaList = [...mangaArray];
    editList({
      variables: {
        id: dummyState.id,
        animeList: dummyState.animeList,
        mangaList: dummyState.mangaList,
      }
    });
  };

  // Searches the list and returns a bool that determines if the add button is a remove button and vice versa.
  const favoriteListSearcher = (idMal, type) => {
    if (type === "ANIME")
      for (let value of list) {
        if (value.idMal === idMal) {
          return true;
        }
      }
    else {
      for (let value of mangaList) {
        if (value.idMal === idMal) {
          return true;
        }
      }
    }
    return false;
  };
  // This removes an anime from the list by looking for the anime of the same ID
  const favoriteListHandler = (idMal, type) => {
    let newList = [];
    if (type === "ANIME") {
      for (let value of list) {
        if (value.idMal !== idMal) {
          newList = [...newList, value];
        }
      }
      setList([...newList]);
    } else {
      for (let value of mangaList) {
        if (value.idMal !== idMal) {
          newList = [...newList, value];
        }
      }
      setMangaList([...newList]);
    }
  };
  // This makes sure that the clicked anime is remembered after going towards the anime page.
  const setClickedHandler = (click) => {
    setClicked(click);
  };

  // This is juse the logic used to make sure the user is authenticated between sessions and if they logout correctly sets the state so that isAuthenticated returns false.
  useEffect(
    (admin) => {
      const unsubscribe = app.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch({
            type: "AUTH_STATE_CHANGED",
            payload: {
              isAuthenticated: true,
              user: {
                id: user.uid,
                avatar: user.photoURL,
                email: user.email,
                name: user.displayName || user.email,
                tier: "Premium",
              },
            },
          });
        } else {
          dispatch({
            type: "AUTH_STATE_CHANGED",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      });
      return unsubscribe;
    },
    [dispatch]
  );
  // This useEffect makes sure to load and save the favorite list every time a rerender is made (basically whenever the button in GeneralInfo needs to change its text)

  return (
    <Authentication.Provider
      value={{
        ...state,
        method: "firebaseAuth",
        logout: logoutHandler,
        signInWithEmailAndPassword,
        click: setClickedHandler,
        addFavorite: favoriteListBuilder,
        removeFavorite: favoriteListHandler,
        searchList: favoriteListSearcher,
        signInWithGoogle,
        createUserWithEmailAndPassword,
        favoriteHandler: favoriteHandler,
        setList: makeList,
        deleteHandler: deleteHandler,
        deleteList: deleteList,
        favorite: favorite,
        clicked: clicked,
        userList: userList,
        favoriteList: list,
        mangaList: mangaList,
        user: app.auth().currentUser,
      }}
    >
      {children}
    </Authentication.Provider>
  );
};
export default AuthProvider;
