import React, { useState, createContext, useReducer, useEffect } from "react";
import axios from "axios";
import app from "../lib/firebase";
import "firebase/firestore";

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
    uid: null,
    animeList: [],
    mangaList: [],
  });

  // This is the back end stuff.

  const deleteHandler = (bool) => {
    setDeleteList(bool);
  };

  const getList = async (uid) => {
    const { data } = await axios.get(`/api/List/${uid}`, {
      params: {
        uid: uid,
      },
    });
    setupAnimeList(data);
    setupMangaList(data);
    setUserList(data);
  };

  const setupAnimeList = async (user) => {
    let animeArray = [];
    for (let value of user.animeList) {
      let { data } = await axios.get(`/api/Anime/${value}`);
      animeArray = [...animeArray, data];
    }
    setList([...animeArray]);
  };

  const setupMangaList = async (data) => {
    let mangaArray = [];
    for (let value of data.mangaList) {
      let { data } = await axios.get(`/api/Manga/${value}`);
      mangaArray = [...mangaArray, data];
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
      if (anime.type === "TV" || anime.type === "Movie") {
        const { data } = await axios.get(`/api/Anime/${anime.mal_id}`);
        setList([...list, data]);
      } else {
        const { data } = await axios.get(`/api/Manga/${anime.mal_id}`);
        setMangaList([...mangaList, data]);
      }
  };

  const determinePutPostDelete = async () => {
    let animeArray = [];
    let mangaArray = [];
    let dummyState = userList;
    const { data } = await axios.get(`/api/List/${state.user.id}`);
    if (!deleteList) {
      if (data.animeList.length !== 0) {
        putList(animeArray, mangaArray, dummyState);
      } else {
        postList(animeArray, mangaArray, dummyState);
      }
    } else {
      if (userList._id) {
        axios.delete(`/api/DeleteList/${userList._id}`);
      }
    }
  };

  const postList = (animeArray, mangaArray, dummyState) => {
    for (let value of list) {
      animeArray.push(value.mal_id);
    }
    for (let value of mangaList) {
      mangaArray.push(value.mal_id);
    }
    dummyState.animeList = [...animeArray];
    dummyState.mangaList = [...mangaArray];
    axios.post("/api/CreateList", {
      uid: dummyState.uid,
      animeList: dummyState.animeList,
      mangaList: dummyState.mangaList,
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
    axios.put("/api/EditList", {
      _id: dummyState._id,
      uid: dummyState.uid,
      animeList: dummyState.animeList,
      mangaList: dummyState.mangaList,
    });
  };

  // Searches the list and returns a bool that determines if the add button is a remove button and vice versa.
  const favoriteListSearcher = (mal_id, type) => {
    if (type === "TV" || type === "Movie")
      for (let value of list) {
        if (value.mal_id === mal_id) {
          return true;
        }
      }
    else {
      for (let value of mangaList) {
        if (value.mal_id === mal_id) {
          return true;
        }
      }
    }
    return false;
  };
  // This removes an anime from the list by looking for the anime of the same ID
  const favoriteListHandler = (mal_id, type) => {
    let newList = [];
    if (type === "TV" || type === "Movie") {
      for (let value of userList.animeList) {
        if (value.mal_id !== mal_id) {
          newList = [...newList, value];
        }
      }
      setList([...newList]);
    } else {
      for (let value of userList.mangaList) {
        if (value.mal_id !== mal_id) {
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
        getList: getList,
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
