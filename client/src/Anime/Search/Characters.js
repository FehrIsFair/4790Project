import React, { useContext, useState, useEffect } from "react";
import { Card, Typography } from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Transition from "react-transition-group/Transition";
import LazyLoad from "react-lazyload";

import { Authentication } from "../../Authentication/Authentication";
import CharInfo from "../GeneralInfo/CharInfo";

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
const Characters = () => {
  // Hooks for the component
  const authContext = useContext(Authentication);
  const [searchResults, setSearchResults] = useState(Array);
  const [compLoad, setCompLoad] = useState(false);

  // The logic needed to re render upon a new search and use the favorite attribute of the context that I might remove (inb4 I forget to remove this comment)
  useEffect(() => {
    const authMeothod = axios.create({
      baseURL: "http://localhost:6060"
    })
    async function getResults() {
      const { data } = await authMeothod.get(`/api/Char`);

      console.log(Array.isArray(data));
      return data;
    }
    async function setResults() {
      setSearchResults(await getResults());
    }
    setResults();
  }, []);

  useEffect(() => {
    if (!compLoad && searchResults) {
      setCompLoad(true);
    }
  }, [compLoad, searchResults]);

  // Route Gauarding
  if (!authContext.auth) {
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
            <Typography variant="h3">For some reason not all characters had ages...some have in their bios tho???</Typography>
          </Card>
            {searchResults?.map((result) => {
              return (
                <>
                  <LazyLoad offset={100}>
                    <CharInfo char={result} />
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
export default Characters;