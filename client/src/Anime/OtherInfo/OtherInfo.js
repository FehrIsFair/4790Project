import React from "react";
import "../../anime.css";
import { Card, Typography, List, ListItem } from "@material-ui/core";

// This literally just renders the other titles info and the adaptation info if ther eis info to display.
const OtherInfo = (props) => {
  const space = " ";
  return (
    <Card>
      {props.synonyms?.length !== 0 ? (
        <div id="other-titles">
          <Typography variant="h4">Other Titles:</Typography>
          <List className="liststyle">
            {props.synonyms?.map((value) => {
              return <ListItem>{value}</ListItem>;
            })}
          </List>
        </div>
      ) : null}
        <div id="source" styles="">
          <Typography variant="p">
            Source:
            {
              space /*this wouldn't let me put a space here manually so I had to do some trickery*/
            }
            {props.source}
          </Typography>
        </div>
    </Card>
  );
};
export default OtherInfo;
