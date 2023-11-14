import Header from "../header/Header";
import SearchForm from "../movies/searchForm/SearchForm";
import MoviesCardList from "../movies/moviesCardList/MoviesCardsList";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import apiMain from "../../utils/MainApi";

function SavedMovies({ savedMovies, deleteMovie, isLogged }) {
  const [isShort, setIsShort] = useState(false);
  const [firstEntrance, setFirstEntrance] = useState(true);
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [neededMovie, setNeededMovie] = useState("");
  const [filteredSaved, setFilteredSaved] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [moviesToRenderAll, setMoviesToRenderAll] = useState([]);

  const filter = (search, isShort, moviesToRender) => {
    setNeededMovie(search);
    setFilteredSaved(
      moviesToRender.filter((item) => {
        const searchName = item.nameRU
          .toLowerCase()
          .includes(search.toLowerCase());
        return isShort ? searchName && item.duration <= 40 : searchName;
      })
    );
  };


  useEffect(() => {
    const fetchData = () => {
      apiMain.getMovies(localStorage.token)
        .then((dataMovies) => {
          setMoviesToRender(dataMovies);
          localStorage.setItem("movieCard", JSON.stringify(dataMovies));
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    };
  
    fetchData();
  }, [deleteMovie]);



  useEffect(() => {
    const handleFilter = () => {
      setFilteredSaved(
        moviesToRender.filter((item) => {
          const searchName = item.nameRU
            .toLowerCase()
            .includes(neededMovie.toLowerCase());
          return isShort ? searchName && item.duration <= 40 : searchName;
        })
      );
      localStorage.setItem("theMoviesSaved", JSON.stringify(filteredSaved));
    };
    if (isSearching) {
      handleFilter();
    }
  }, [isSearching, moviesToRender, neededMovie, isShort]);

  function searchMovies(search) {
    setNeededMovie(search);
    setIsSearching(true);
    localStorage.setItem("movieSaved", JSON.stringify(search));
    filter(search, isShort, moviesToRender);
  }

  return (
    <>
      <Header isLogged={isLogged} />
      <main className="main">
        <SearchForm
          isShort={isShort}
          searchMovies={searchMovies}
          neededMovie={neededMovie}
          firstEntrance={firstEntrance}
          savedMovies={savedMovies}
          movies={savedMovies}
          filter={filter}
          setIsShort={setIsShort}
        />
        <MoviesCardList
          filteredMovies={isSearching ? filteredSaved : moviesToRender}
          deleteMovie={deleteMovie}
          firstEntrance={firstEntrance}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
