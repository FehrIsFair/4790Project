import React from "react";
import { Card, Typography } from "@material-ui/core";

const CharInfo = ({ char, styles }) => {

  return (
    <Card id="synopsis" style={styles}>
      <img
        src={char.image.medium}
        alt={`${char.title} Promotional Art`}
        style={{
          width: "225px !important",
          height: "346px",
        }}
      />
      <div id="scoreSyn">
        <div id="titleContain">
            <Typography id="animeTitle" variant="h4">
              {char.name.full}
            </Typography>
        </div>

        <Typography className="score">
          <span className="bold">Age:</span> {char.age}
        </Typography>

        <div id="synText">
          <Typography>Synopsis:</Typography>
          <Typography>{char.description}</Typography>
        </div>
      </div>
    </Card>
  );
};
export default CharInfo;
