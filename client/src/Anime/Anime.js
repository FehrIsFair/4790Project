import React, { useEffect, useState, useContext } from "react";
import { Card } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Transition from "react-transition-group/Transition";
import { useQuery, gql } from "@apollo/client";

import GenreList from "./GenreList/GenreList";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import OtherInfo from "./OtherInfo/OtherInfo";
import { Authentication } from "../Authentication/Authentication";

const GET_ONE_ANIME = gql`
  query SingleAnime($idMal: Number!) {
    singleAnime(idMal: $idMal) {
      idMal
      title
      description
      genres
      meanScore
      coverImage
      synonyms
      type
      source
    }
  }
`;

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

const Anime = () => {
  // Hooks needed in order for the view to function.
  const [compLoad, setCompLoad] = useState(false);
  const authContext = useContext(Authentication);
  const { loading, error, data } = useQuery(GET_ONE_ANIME, {variables: {
    idMal: authContext.clicked
  }});

  // Logic for setting up the view for the view
  useEffect(() => {
    if (!compLoad && !loading) {
      setCompLoad(true);
    }
  }, [compLoad, loading]);

  // Route Gaurding
  if (!authContext.isAuthenticated) {
    return <Redirect to="/" />;
  }

  // Ensuring the view is populated while the anime is being called on.
  if (loading) {
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
          <GeneralInfo anime={data} searchResult={false} styles={null} />
          {/* These components are mainly static and don't have any special function
          They only take the props given and map them out. In some cases only if they have something to map out.
    */}
          <GenreList genres={data.genres} />
          <OtherInfo
            title_synonyms={data.synonyms}
            genres={data.genres}
            source={data.source}
          />
        </Card>
      )}
    </Transition>
  );
};

export default Anime;
