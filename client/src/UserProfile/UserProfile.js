import React, { useContext, useState, useEffect } from "react";
import { Card, Typography } from "@material-ui/core";
import axios from "axios";

import { Authentication } from "../Authentication/Authentication";
import { Redirect } from "react-router";

const UserProfile = () => {
  const [user, setUser] = useState();
  const authContext = useContext(Authentication);

  useEffect(() => {
    const authMethod = axios.create({
      baseURL: "http://localhost:6060",
    });
    const setupProfile = async () => {
      const { data } = await authMethod(`/api/User/${authContext.userName}`);
      setUser(data);
    };
    if (!user) {
      setupProfile();
    }
  }, [user, authContext]);

  if (!authContext.auth) {
    return <Redirect path="/" />;
  }

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <Card id="profile">
      <Typography variant="h3">User Profile</Typography>
      <Typography variant="h4">{authContext.userName}</Typography>
      <Card>
        <Typography variant="h5">Favorite Character</Typography>
        <Typography variant="p">{user.FavCharacter}</Typography>
        <Typography variant="h5">Favorite Anime</Typography>
        <Typography variant="p">{user.FavAnime}</Typography>
        <Typography variant="h5">Favorite Manga</Typography>
        <Typography variant="p">{user.FavManga}</Typography>
      </Card>
    </Card>
  );
};
export default UserProfile;
