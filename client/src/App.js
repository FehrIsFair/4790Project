import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Anime from "./Anime/Anime";
import Login from "./Login/Login";
import NavBar from "./Anime/Navigation";
import Search from "./Anime/Search/Search";
import FavoriteList from "./Anime/FavoriteList/FavoriteList";
import SearchManga from "./Anime/Search/SearchManga";
import Footer from "./Anime/Footer";
import Manga from "./Anime/Manga";
import SignUp from "./Login/SignUp/SignUp";
import UpdatePassword from "./Anime/UpdatePassword/UpdatePassword"

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <NavBar />
          <Route path="/" exact component={Login} />
          <Route path="/SignUp" exact component={SignUp} />
          <Route path="/Anime" exact component={Anime} />
          <Route path="/Search" exact component={Search} />
          <Route path="/Favorites" exact component={FavoriteList} />
          <Route path="/SearchManga" exact component={SearchManga} />
          <Route path="/Manga" exact component={Manga} />
          <Route path="/Change" exact component={UpdatePassword} />
          <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App;
