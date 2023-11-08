import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import apiMovies from "../../utils/MoviesApi";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MoviesCardList from "./moviesCardList/MoviesCardsList";
import SearchForm from "./searchForm/SearchForm";

function Movies({ savedMovies, isLogged, saveMovie, deleteMovie }) {
  
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [neededMovie, setNeededMovie] = useState("");
  const [theMovies, setTheMovies] = useState([]);
  const [isShort, setIsShort] = useState(false);
  const [firstEntrance, setFirstEntrance] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const filter = useCallback((search, isShort, movies) => {
    setNeededMovie(search);
    console.log(search, isShort, movies)
    localStorage.setItem("movie", JSON.stringify(search));
    localStorage.setItem("shorts", JSON.stringify(isShort));
    localStorage.setItem("theMovies", JSON.stringify(movies));
    setFilteredMovies(
      movies.filter((item) => {
        const searchName = item.nameRU
          .toLowerCase()
          .includes(search.toLowerCase());
        return isShort ? searchName && item.duration <= 40 : searchName;
      })
    );
    console.log(filteredMovies);
    console.log(movies.filter((item) => {
      const searchName = item.nameRU
        .toLowerCase()
        .includes(search.toLowerCase());
      return isShort ? searchName && item.duration <= 40 : searchName;
    }))
  }, []);

  function searchMovies(search) {
    if (theMovies.length === 0) {
      setIsDownloading(true)
      apiMovies
      .getMovies()
      .then((res) => {
        setTheMovies(res);
        setIsShort(false);
        setFirstEntrance(false);
        filter(search, isShort, res); 
        console.log(res);
        console.log(search);
      })
      .catch((err) => {
        console.error(`Ошибка при поиске ${err}`);
      })
      .finally(() => setIsDownloading(false))
  } else {
    filter(search, isShort, theMovies)
  }}

   useEffect(() => {
    if (localStorage.theMovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.theMovies)
      const search = JSON.parse(localStorage.movie)
      const isShort = JSON.parse(localStorage.shorts)
      setFirstEntrance(false)
      setNeededMovie(search)
      setIsShort(isShort)
      setTheMovies(movies)
      filter(search, isShort, movies)
    }
  }, [filter]) 

  return (
    <>
      <Header isLogged={isLogged} />
      <main className="main">
         <SearchForm
         filteredMovies={filteredMovies}
         movies={theMovies}
         saveMovie={saveMovie}
         deleteMovie={deleteMovie}
         neededMovie={neededMovie}
         searchMovies={searchMovies}
         isShort={isShort}
         setIsShort={setIsShort}
         filter={filter}
        /> 
        <MoviesCardList
          filteredMovies={filteredMovies}
          movies={theMovies}
          saveMovie={saveMovie}
          deleteMovie={deleteMovie}
          neededMovie={neededMovie}
          searchMovies={searchMovies}
          savedMovies={savedMovies}
          isDownloading={isDownloading}
        /> 
      </main>
      <Footer />
    </>
  );
}

export default Movies;
