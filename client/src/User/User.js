import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

import { Authentication } from "../Authentication/Authentication";

export const User = createContext({
  renderList: [],
  searchList: () => {},
  addFavorites: () => {},
  removeFavorites: () => {},
});

const UserContext = ({ children }) => {
  const authContext = useContext(Authentication);
  const [renderList, setRenderList] = useState([]);
  const [userList, setUserList] = useState();
  const backEnd = axios.create({
    baseURL: "http://localhost:6060",
  });
  // This build the favorite list.
  const favoriteListBuilder = async (item, searchResult) => {
    if (searchResult) {
      if (item.type === "Anime") {
        const { data } = await backEnd.get(`/Anime/${item.mal_id}`);
        item = data;
      } else {
        const { data } = await backEnd.get(`/Manga/${item.mal_id}`);
        item = data;
      }
    }
    if (item.type === "Anime") {
      let dummyState = { ...userList };
      let newArray = renderList;
      newArray.push(item);
      dummyState.animelist = [...dummyState.animeList, item.mal_id];
      setUserList(dummyState);
      setRenderList([...newArray]);
    } else {
      let dummyState = { ...userList };
      let newArray = renderList;
      newArray.push(item);
      dummyState.mangaList = [...dummyState.mangaList, item.mal_id];
      setUserList(dummyState);
      setRenderList([...newArray]);
    }
  };

  // Searches the list and returns a bool that determines if the add button is a remove button and vice versa.
  const favoriteListSearcher = (mal_id, type) => {
    let foundItem = false;
    if (type === "Anime") {
      for (let value of userList.animeList) {
        if (value === mal_id) {
          foundItem = true;
        }
      }
    } else {
      for (let value of userList.mangaList) {
        if (value === mal_id) {
          foundItem = true;
        }
      }
    }
    return foundItem;
  };
  // This removes an anime from the list by looking for the anime of the same ID
  const favoriteListHandler = (mal_id, type) => {
    let newList = [];
    let newRenderList = [];
    let dummyState;
    if (type === "Anime") {
      for (let value of userList.animelist) {
        if (value !== mal_id) {
          newList = [...newList, value];
        }
      }
      for (let value of renderList) {
        if (value.mal_id !== mal_id) {
          newRenderList = [...newRenderList, value];
        }
      }
      dummyState = userList;
      dummyState.animeList = [...newList];
      setRenderList([...newRenderList]);
      setUserList({ ...dummyState });
    } else {
      for (let value of userList.mangaList) {
        if (value !== mal_id) {
          newList = [...newList, value];
        }
      }
      for (let value of renderList) {
        if (value.mal_id !== mal_id) {
          newRenderList = [...newRenderList, value];
        }
      }
      dummyState = userList;
      dummyState.mangaList = [...newList];
      setRenderList([...newList]);
      setUserList({ ...dummyState });
    }
  };
  useEffect(() => {
    const backEnd = axios.create({
      baseURL: "http://localhost:6060",
    });
    const getList = async () => {
      return backEnd.get(`/List/${authContext.user.uid}`, {
        params: {
          uid: authContext.user.uid,
        },
      });
    };
    if (!userList) {
      setUserList(getList());
    }
  }, [userList]);

  return (
    <UserContext.Provider
      value={{
        renderList: renderList,
        addFavorite: favoriteListBuilder,
        removeFavorite: favoriteListHandler,
        searchList: favoriteListSearcher,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


export default UserContext;