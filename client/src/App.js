import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import Anime from "./Anime/Anime";
import Login from "./Login/Login";
import Signup from "./Login/SignUp/SignUp";
import NavBar from "./Anime/Navigation";
import Search from "./Anime/Search/Search";
import FavoriteList from "./Anime/FavoriteList/FavoriteList";
import SearchManga from "./Anime/Search/SearchManga";
import Footer from "./Anime/Footer";
import Manga from "./Anime/Manga";

const client = new ApolloProvider({});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider>
        <div className="App">
          <NavBar />
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/Anime" exact component={Anime} />
          <Route path="/Search" exact component={Search} />
          <Route path="/Favorites" exact component={FavoriteList} />
          <Route path="/SearchManga" exact component={SearchManga} />
          <Route path="/Manga" exact component={Manga} />
          <Footer />
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
