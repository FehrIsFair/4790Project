import React, { useState, useContext} from "react";
import { Card, Typography, Switch, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Redirect } from "react-router-dom";

import { Authentication } from "../../Authentication/Authentication";
import AnimeList from "./Lists/AnimeList";
import MangaList from "./Lists/MangaList";


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

// The Component proper
// Because of the way I constructed this component, using the GeneralInfo Component causes an infinite loop
// So, this will stay the way it is because I didn't want to debug that.
const FavoriteList = () => {
  // Hooks needed for the page to function.
  const [isAnime, setIsAnime] = useState(true);
  const authContext = useContext(Authentication);

  const determineIfDelete = (bool) => {
    authContext.deleteHandler(bool);
  }

  const handleChange = () => {
    if (isAnime) {
      setIsAnime(false);
    } else {
      setIsAnime(true);
    }
  };

  if (authContext.auth === null) {
    return <Redirect to="/" />;
  }

  return (
    <Card id="true-contain">
      <div className="switch-contain">
        <Typography variant="p" className="switch-text">Switch Lists</Typography>
        <AnimeSwitch
          className="switch"
          checked={isAnime}
          onChange={handleChange}
          name="listSwitch"
          inputProps={{ "aria-label": "primary-checkbox" }}
        />
        {!authContext.deleteList ? <Button className="delete-button" onClick={() => determineIfDelete(true)}>Delete List on Logout</Button> : <Button className="delete-button" onClick={() => determineIfDelete(false)}>Don't Delete List on Logout</Button>}
      </div>
      {isAnime ? <AnimeList /> : <MangaList />}
    </Card>
  );
};
export default FavoriteList;
