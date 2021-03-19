import React, { useContext, useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Transition from "react-transition-group/Transition";
import LazyLoad from "react-lazyload";

import { Authentication } from "../../Authentication/Authentication";
import GeneralInfo from "../GeneralInfo/GeneralInfo";

// Transistion States
const transitionStyles = {
  entering: {
    opacity: 0.5,
  },
  entered: {
    opacity: 1,
  },
  exiting: {
    opacity: 0.5,
  },
  exited: {
    opacity: 0,
  },
};

// Main Component
const Search = () => {
  // Hooks for the component
  const authContext = useContext(Authentication);
  const [searchResults, setSearchResults] = useState(Array);
  const [compLoad, setCompLoad] = useState(false);

  // JikanAPI reference.
  // const jikanApi = axios.create({
  //   baseURL: "https://api.jikan.moe/v3/",
  // });

  // This is sthe search function. This is how the view gets its results.
  // async function getResults(newCall) {
  //   // This is configured to ensure the correct anime at least pop up correctly with the mature content filter on.
  //   // Otherwise titles like Black Clover and My Hero Academia won't ever show up.
  //   const { data } = await jikanApi.get(
  //     `search/anime?q=${newCall}&limit=15&genre=12&genre_exclude=0&order_by=members&sort=desc`
  //   );
  //   setSearchResults(data.results);
  // }

  // The logic needed to re render upon a new search and use the favorite attribute of the context that I might remove (inb4 I forget to remove this comment)
  useEffect(() => {
    const backEnd = axios.create({
      baseURL: "http://localhost:6060/api",
    });
    async function getResults() {
      const { data } = await backEnd.get(`/Anime`);

      console.log(Array.isArray(data));
      return data;
    }
    async function setResults() {
      setSearchResults( await getResults());
    }
    setResults();
    if (authContext.userList.uid === null && authContext.user !== null) {
      authContext.getList(authContext.user.uid);
    }
  }, [authContext]);

  useEffect(() => {
    if (!compLoad && searchResults) {
      setCompLoad(true);
    }
  }, [compLoad, searchResults]);

  // Route Gauarding
  if (!authContext.isAuthenticated) {
    return <Redirect to="/" />;
  }

  // conditional rendering to keep the view populated between searches.
  if (!searchResults) {
    return <div>Loading...</div>;
  } else {
    return (
      <Transition in={compLoad} timeout={1000} mountOnEnter unmountOnExit>
        {(state) => (
          <Card
            id="search"
            style={
              ({
                transition: "opacity 1s ease-out",
              },
              transitionStyles[state])
            }
          >
            {searchResults?.map((result) => {
              return (
                <>
                  <LazyLoad offset={100}>
                    <GeneralInfo anime={result} searchResult={true} />
                  </LazyLoad>
                </>
              );
            })}
          </Card>
        )}
      </Transition>
    );
  }
};
export default Search;
