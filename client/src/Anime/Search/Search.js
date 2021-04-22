import React, { useContext, useState, useEffect } from "react";
import { Card } from "@material-ui/core";
// import { SearchIcon } from "@material-ui/icons/Search";
import { Redirect } from "react-router-dom";
import Transition from "react-transition-group/Transition";
import LazyLoad from "react-lazyload";
// import { gql, useMutation } from "@apollo/client";

import { Authentication } from "../../Authentication/Authentication";
import GeneralInfo from "../GeneralInfo/GeneralInfo";

// const SEARCH_ANIME = gql`
//   mutation SearchAnime($searchQuery: String) {
//     searchManga(searchQuery: $searchQuery) {
//       malID
//       title
//       description
//       meanScore
//       type
//       coverImage
//     }
//   }
// `;

// Transistion States
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

// Main Component
const Search = () => {
  // Hooks for the component
  const authContext = useContext(Authentication);
  const [compLoad, setCompLoad] = useState(false);
  const [data, setData] = useState();
  // const [searchTerm, setSearchTerm] = useState();
  // const [searchAnime, { data: searchData, loading: searchLoading }] = useMutation(SEARCH_ANIME);

  // const handleChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };
  // const handleSearch = () => {
  //   searchAnime({
  //     variables: {
  //       searchQuery: searchTerm,
  //     },
  //   });
  // }

  useEffect(() => {
    if (!compLoad && !authContext.loadingAnime) {
      setData([...authContext.allAnime.allAnime]);
      setCompLoad(true);
    }
    // if (!searchLoading && !searchData) {
    //   setData(searchData.searchAnime)
    // }
  }, [compLoad, authContext]);

  // Route Gauarding
  if (authContext.userName === null) {
    return <Redirect to="/" />;
  }

  // conditional rendering to keep the view populated between searches.
  if (authContext.loadingAnime) {
    return <div>Loading...</div>;
  } else {
    return (
      <Transition in={compLoad} timeout={1000} mountOnEnter unmountOnExit>
        {(state) => (
          <Card
            id="search"
            style={
              ({
                transition: "opacity 1s ease-out",
              },
              transitionStyles[state])
            }
          >
            {/*<Card>
              <form>
                <TextField
                  autoFocus
                  id="outlined-basic"
                  name="Search"
                  className="textfield"
                  label="Search"
                  variant="outlined"
                  onChange={handleChange}
                />
                <IconButton aria-label="search" onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </form>
            </Card>*/}
            {data?.map((anime) => {
              return (
                <>
                  <LazyLoad offset={100}>
                    <GeneralInfo anime={anime} searchResult={true} />
                  </LazyLoad>
                </>
              );
            })}
          </Card>
        )}
      </Transition>
    );
  }
};
export default Search;
