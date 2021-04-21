import React, { useState, useContext, useEffect } from "react";
import { Card, Typography, Button, Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Transition } from "react-transition-group";
import { gql, useMutation } from "@apollo/client";

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

const GET_SOME_ANIME = gql`
  mutation GetSomeAnime($idMalArray: [Int]!) {
    findSomeAnime(idMalArray: $idMalArray) {
      idMal
      title
      description
      coverImage
      meanScore
      type
    }
  }
`;

// The Component proper
// Because of the way I constructed this component, using the GeneralInfo Component causes an infinite loop
// So, this will stay the way it is because I didn't want to debug that.
const AnimeList = () => {
  // Hooks needed for the page to function.
  const AuthContext = useContext(Authentication);
  const [compLoad, setCompLoad] = useState(false);
  const [listChange, setListChange] = useState();
  const history = useHistory();
  const [getSomeAnime, {loading, data}] = useMutation(GET_SOME_ANIME);

  // This is mainly to track if the list has changed or not.
  const listChangeTracker = (idMal, type) => {
    AuthContext.removeFavorite(idMal, type);
    setListChange(true);
  };

  // this is another redirect to ensure the page is brought up with the correct data.
  const redirectToAnimePage = (idMal) => {
    AuthContext.click(idMal);
    history.push("/Anime");
  };

  // The logic to see if the view should rerender.
  useEffect(() => {
    if (!compLoad) {
      setCompLoad(true);
    }
    if (!data) {
      getSomeAnime({variables: {
        idMalArray: AuthContext.userList.animeList,
      }})
    }
    if (listChange) {
      getSomeAnime({variables: {
        idMalArray: AuthContext.userList.animeList,
      }})
      setListChange(false);
    }
  }, [compLoad, AuthContext.userList.animeList, getSomeAnime, data, listChange]);

  // Tells the user if they don't have any favorites saved. Thought it doesn't seem to work.
  if (loading) {
    return (
      <Card>
        <Typography>Loading...</Typography>
      </Card>
    );
  }

  return (
    <Transition in={compLoad} timeout={1000} mountOnEnter unmountOnExit>
      {(state) => (
        <Card className="favoriteList">
          <Typography className="pageTitle" variant="h4">
            Favorite Anime List
          </Typography>
          {data?.findSomeAnime?.map((item) => {
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
                  src={item.coverImage}
                  alt={`${item.title} Promotional Art`}
                  style={{
                    width: "225px !important",
                    height: "346px",
                  }}
                  className="resultImage"
                />
                <div classNames="titleScore">
                  <Link onClick={() => redirectToAnimePage(item.idMal)}>
                    <Typography variant="h4">{item.title}</Typography>
                  </Link>
                  <div className="favScore">
                    <Typography variant="h5">{item.meanScore}</Typography>
                    <Button
                      variant="contained"
                      onClick={() => listChangeTracker(item.idMal, item.type)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="favSyn">
                  <Typography variant="p" className="">
                    {item.description}
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
export default AnimeList;
