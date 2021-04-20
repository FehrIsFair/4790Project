import React, { useState, useContext, useEffect } from "react";
import { Card, Typography, Button, Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Transition } from "react-transition-group";
import { gql, useQuery } from "@apollo/client";

import { Authentication } from "../../../Authentication/Authentication";

// Transistion Stylings
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

const GET_SOME_MANGA = gql`
  query GetSomeManga($idArray: Array) {
    findSomeManga(idMalArray: $idArray) {
      idMal
      title
      description
      coverImage
      meanScore
    }
  }
`;

// The Component proper
// Because of the way I constructed this component, using the GeneralInfo Component causes an infinite loop
// So, this will stay the way it is because I didn't want to debug that.
const MangaList = () => {
  // Hooks needed for the page to function.
  const AuthContext = useContext(Authentication);
  const [compLoad, setCompLoad] = useState(false);
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_SOME_MANGA, {
    variables: {
      idMalArray: AuthContext.userList.mangaList,
    },
  });

  // This is mainly to track if the list has changed or not.
  const listChangeTracker = (idMal) => {
    AuthContext.removeFavorite(idMal);
  };

  // this is another redirect to ensure the page is brought up with the correct data.
  const redirectToAnimePage = (idMal) => {
    AuthContext.click(idMal);
    history.push("/Manga");
  };

  // The logic to see if the view should rerender.
  useEffect(() => {
    if (!compLoad && !loading) {
      setCompLoad(true);
    }
  }, [
    compLoad,
    loading
  ]);

  if (error) {
    console.log(error);
    return <div>Something went wrong. Check the console.</div>
  }

  // Tells the user if they don't have any favorites saved. Thought it doesn't seem to work.
  if (loading) {
    return (
      <Card>
        <Typography>
          Loading...
        </Typography>
      </Card>
    );
  }

  return (
    <Transition in={compLoad} timeout={1000} mountOnEnter unmountOnExit>
      {(state) => (
        <Card className="favoriteList">
          <Typography className="pageTitle" variant="h4">
            Favorite List
          </Typography>
          {data.findSomeManga.map((item) => {
            // Maps the array to the DOM.
            // Having a hard time getting the transition to function similarly to Search.js
            return (
              <Card
                className="favorite"
                style={
                  ({
                    transition: "opacity 1s ease-in",
                  },
                  transitionStyles[state])
                }
              >
                <img
                  src={item.image_url}
                  alt={`${item.title} Promotional Art`}
                  style={{
                    width: "225px !important",
                    height: "346px",
                  }}
                  className="resultImage"
                />
                <div classNames="titleScore">
                  <Link onClick={() => redirectToAnimePage(item.mal_id)}>
                    <Typography variant="h4">{item.title}</Typography>
                  </Link>
                  <div className="favScore">
                    <Typography variant="h5">{item.score}</Typography>
                    <Button
                      variant="contained"
                      onClick={() => listChangeTracker(item.mal_id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="favSyn">
                  <Typography variant="p" className="">
                    {item.synopsis}
                  </Typography>
                </div>
              </Card>
            );
          })}
        </Card>
      )}
    </Transition>
  );
};
export default MangaList;
