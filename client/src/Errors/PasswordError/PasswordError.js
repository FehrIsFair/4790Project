import React from "react";
import { Card, Typography } from "@material-ui/core";

const PasswordError = () => {
  return (
    <Card>
      <Typography>Passwords do not match</Typography>
    </Card>
  );
};
export default PasswordError;
