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
  const [isAscending, setIsAcending] = useState(true);

  const handleSort = () => {
    tempArray = searchResults;
    if (isAscending) {
      tempArray.sort((a, b) => {
        return a.title - b.title;
      });
    } else {
      tempArray.sort((a, b) => {
        return b.title - a.title;
      });
    }
    setSearchResults(tempArray);
  }

  // The logic needed to re render upon a new search and use the favorite attribute of the context that I might remove (inb4 I forget to remove this comment)
  useEffect(() => {
    async function getResults() {
      const { data } = await axios.get(`/api/Anime`);

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
    const handleSort = () => {
      tempArray = searchResults;
      if (isAscending) {
        tempArray.sort((a, b) => {
          return a.title - b.title;
        });
      } else {
        tempArray.sort((a, b) => {
          return b.title - a.title;
        });
      }
      setSearchResults(tempArray);
    };
    if (!compLoad && searchResults) {
      setCompLoad(true);
      handleSort();
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
