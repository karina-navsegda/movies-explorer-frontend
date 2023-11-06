import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import apiMovies from "../../utils/MoviesApi";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MoviesCardList from "./moviesCardList/MoviesCardsList";
import SearchForm from "./searchForm/SearchForm";

function Movies({ savedMovies, saveMovie, isLogged }) {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchedMovie, setSearchedMovie] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [firstEntrance, setFirstEntrance] = useState(true);

  const handleSearchMovie = (movie) => {
    setSearchedMovie(movie);
  };

  const filter = useCallback((search, isCheck, movies) => {
    setSearchedMovie(search);
    localStorage.setItem("movie", JSON.stringify(search));
    localStorage.setItem("shorts", JSON.stringify(isCheck));
    localStorage.setItem("allmovies", JSON.stringify(movies));
    setFilteredMovies(
      movies.filter((movie) => {
        const searchName = movie.nameRU
          .toLowerCase()
          .includes(search.toLowerCase());
        return isCheck ? searchName && movie.duration <= 40 : searchName;
      })
    );
  }, []);

  function searchMovies(search) {
    if (allMovies.length === 0) {
      apiMovies
        .getMovies()
        .then((res) => {
          setAllMovies(res);
          console.log(allMovies);
          setIsCheck(false);
          setFirstEntrance(false);
          filter(search, isCheck, res);
        })
        .catch((err) => {
          console.error(`Ошибка при поиске ${err}`);
        });
    } else {
      filter(search, isCheck, allMovies);
      console.log(allMovies);
    }
  }

  useEffect(() => {
    if (localStorage.allmovies && localStorage.movie && localStorage.shorts) {
      const movies = JSON.parse(localStorage.allmovies);
      const search =
        localStorage.getItem("movie") !== null
          ? JSON.parse(localStorage.getItem("movie"))
          : "";
      const isCheck =
        localStorage.getItem("shorts") !== null
          ? JSON.parse(localStorage.getItem("shorts"))
          : false;
      setFirstEntrance(false);
      setSearchedMovie(search);
      setIsCheck(isCheck);
      setAllMovies(movies);
      filter(search, isCheck, movies);
    }
  }, [filter]);

  return (
    <>
      <Header isLogged={isLogged} />
      <main className="main">
    {/*     <SearchForm
          isCheck={isCheck}
          searchMovies={searchMovies}
          firstEntrance={firstEntrance}
          movies={allMovies}
          filter={filter}
          setIsCheck={setIsCheck}
          searchedMovie={handleSearchMovie}
        /> */}
      {/*   <MoviesCardList
          movies={filteredMovies}
          savedMovies={savedMovies}
          saveMovie={saveMovie}
        /> */}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
