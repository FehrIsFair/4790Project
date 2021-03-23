import React, { useContext, useState, useEffect } from "react";
import { Card, Typography, Switch, Button } from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Transition from "react-transition-group/Transition";
import LazyLoad from "react-lazyload";
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import sortObjectsArray from "sort-objects-array"

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

const AnimeSwitch = withStyles({
  switchBase: {
    color: green[300],
    '&$checked': {
      color: green[500],
    },
    '&$checked + $track': {
      backgroundColor: green[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

// Main Component
const Search = () => {
  // Hooks for the component
  const authContext = useContext(Authentication);
  const [searchResults, setSearchResults] = useState(Array);
  const [compLoad, setCompLoad] = useState(false);
  const [isDescending, setIsAcending] = useState(false);

  const handleSort = () => {
    if (!isDescending) {
      setSearchResults(sortObjectsArray(searchResults, "title"));
    }
    else {
      setSearchResults(sortObjectsArray(searchResults, "title", "reverse"));
    }
  };

  const handleChange = () => {
    if (isDescending) {
      setIsAcending(false);
    } else {
      setIsAcending(true);
    }
  };

  // The logic needed to re render upon a new search and use the favorite attribute of the context that I might remove (inb4 I forget to remove this comment)
  useEffect(() => {
    async function getResults() {
      const { data } = await axios.get(`/api/Anime`);

      console.log(Array.isArray(data));
      return data;
    }
    async function setResults() {
      setSearchResults(await getResults());
    }
    setResults();
    if (authContext.userList.uid === null && authContext.user !== null) {
      authContext.getList(authContext.user.uid);
    }
  }, [authContext]);

  useEffect(() => {
    if (!compLoad && searchResults) {
      setCompLoad(true);
      setSearchResults(sortObjectsArray(searchResults, "title"));
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
            <Card>
              <Typography variant="p" className="switch-text">
                Sort: {isDescending ? "Reverse Alpha" : "Alphabetical" }
              </Typography>
              <AnimeSwitch
                className="switch"
                checked={isDescending}
                onChange={handleChange}
                name="searchSort"
                inputProps={{ "aria-label": "primary-checkbox" }}
              />
              <Button onClick={handleSort}>Sort</Button>
            </Card>
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
