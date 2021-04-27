import React from "react";
import { Card, Typography } from "@material-ui/core";

const AuthError = () => {
  return (
    <Card>
      <Typography>Could not find user with Username/Password</Typography>
    </Card>
  );
};
export default AuthError;
