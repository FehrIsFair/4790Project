import React, { useEffect, useState, useContext } from "react";
import { Card } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Transition from "react-transition-group/Transition";

import GenreList from "./GenreList/GenreList";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import OtherInfo from "./OtherInfo/OtherInfo";
import { Authentication } from "../Authentication/Authentication";

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

const Manga = () => {
  // Hooks needed in order for the view to function.
  const [compLoad, setCompLoad] = useState(false);
  const authContext = useContext(Authentication);
  const [anime, setAnime] = useState();


  // Logic for setting up the view for the view
  useEffect(() => {
    if (!anime) {
      for (let value of authContext.allManga.allManga) {
        if (value.idMal === authContext.clicked) {
          setAnime(value);
        }
      }
    }
    if (!compLoad && !anime) {
      setCompLoad(true);
    }
  }, [compLoad, anime, authContext.allManga.allManga, authContext.clicked]);

  // Route Gaurding
  if (!authContext.userName) {
    return <Redirect to="/" />;
  }

  // Ensuring the view is populated while the anime is being called on.
  if (!anime) {
    return <div>Loading...</div>;
  }

  return (
    <Transition in={compLoad} timeout={1000} mountOnEnter unmountOnExit>
      {(state) => (
        <Card
          id="container"
          style={
            ({
              transition: "opacity 1s ease-out",
            },
            transitionStyles[state])
          }
        >
          <GeneralInfo anime={anime} searchResult={false} styles={null} />
          {/* These components are mainly static and don't have any special function
          They only take the props given and map them out. In some cases only if they have something to map out.
    */}
          <GenreList genres={anime?.genres} />
          <OtherInfo
            synonyms={anime?.synonyms}
            genres={anime?.genres}
            source={anime?.source}
          />
        </Card>
      )}
    </Transition>
  );
};

export default Manga;
