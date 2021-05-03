import React, { useContext, useState, useEffect } from "react";
import { Card, Typography, Switch, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Transition from "react-transition-group/Transition";
import LazyLoad from "react-lazyload";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import sortObjectsArray from "sort-objects-array";

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
    "&$checked": {
      color: green[500],
    },
    "&$checked + $track": {
      backgroundColor: green[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

// Main Component
const SearchManga = () => {
  // Hooks for the component
  const authContext = useContext(Authentication);
  const [compLoad, setCompLoad] = useState(false);
  const [isDescending, setIsAcending] = useState(false);
  

  const handleSort = () => {
    if (!isDescending) {
      sortObjectsArray(authContext.allAnime, "title");
    } else {
      sortObjectsArray(authContext.allAnime, "title", "reverse");
    }
  };

  const handleChange = () => {
    if (isDescending) {
      setIsAcending(false);
    } else {
      setIsAcending(true);
    }
  };

  useEffect(() => {
    if (!compLoad && !authContext.loadingAnime) {
      setCompLoad(true);
      sortObjectsArray(authContext.allAnime, "title");
    }
  }, [compLoad, authContext.allAnime, authContext.loadingAnime]);

  // Route Gauarding
  if (authContext.auth === null) {
    return <Redirect to="/" />;
  }

  // conditional rendering to keep the view populated between searches.
  if (authContext.loadingAnime) {
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
                Sort: {isDescending ? "Reverse Alpha" : "Alphabetical"}
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
            {authContext.allManga?.allManga.map((anime) => {
              return (
                <>
                  <LazyLoad offset={100}>
                    <GeneralInfo anime={anime} searchResult={true} />
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
export default SearchManga;
