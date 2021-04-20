import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Typography, Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { Authentication } from "../../Authentication/Authentication";

const GeneralInfo = ({ anime, searchResult, styles }) => {
  // Hooks for controlling the state
  const authContext = useContext(Authentication);
  const [added, setAdded] = useState();
  const history = useHistory();

  // Bunching up removing and adding favorites here to save lines of code
  const addRemoveFavorite = () => {
    if (added) {
      authContext.removeFavorite(anime.idMal, anime.__typename);
    } else {
      authContext.addFavorite(anime.idMal, anime.__typename);
    }
  };

  // this is another redirect to ensure the page is brought up with the correct data.
  const redirectToCorrectPage = (idMal, type) => {
    authContext.click(idMal);
    if (type === "Anime") {
      history.push("/Anime");
    } else {
      history.push("/Manga");
    }
  };

  // This is her to conditinally render the text of the button
  useEffect(() => {
    if (authContext.searchList(anime.idMal, anime.__typename)) {
      setAdded(true);
    } else {
      setAdded(false);
    }
  }, [authContext, anime]);

  return (
    <Card id="synopsis" style={styles}>
      <img
        src={anime.coverImage}
        alt={`${anime.title} Promotional Art`}
        style={{
          width: "225px !important",
          height: "346px",
        }}
      />
      <div id="scoreSyn">
        <div id="titleContain">
          {searchResult ? (
            <Link onClick={() => redirectToCorrectPage(anime.idMal, anime.__typename)}>
              <Typography id="animeTitle" variant="h4">
                {anime.title}
              </Typography>
            </Link>
          ) : (
            <Typography id="animeTitle" variant="h4">
              {anime.title}
            </Typography>
          )}
        </div>

        <Button variant="contained" onClick={() => addRemoveFavorite()}>
          {
            added
              ? "Remove"
              : "Add" /*This is what determines which text to use.*/
          }
        </Button>

        <Typography className="score">
          <span className="bold">Score:</span> {anime.meanScore}
        </Typography>

        <div id="synText">
          <Typography>Synopsis:</Typography>
          <Typography>{anime.description}</Typography>
        </div>
      </div>
    </Card>
  );
};
export default GeneralInfo;
