import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import apiMovies from "../../utils/MoviesApi";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MoviesCardList from "./moviesCardList/MoviesCardsList";
import SearchForm from "./searchForm/SearchForm";

function Movies({ movies, isLogged, saveMovie, deleteMovie }) {
  
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [neededMovie, setNeededMovie] = useState("");
  const [theMovies, setTheMovies] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [firstEntrance, setFirstEntrance] = useState(true);

  const filter = useCallback((search, isCheck, movies) => {
    setNeededMovie(search);
    console.log(search, isCheck, movies)
    localStorage.setItem("movie", JSON.stringify(search));
    localStorage.setItem("shorts", JSON.stringify(isCheck));
    localStorage.setItem("theMovies", JSON.stringify(movies));
    setFilteredMovies(
      movies.filter((item) => {
        const searchName = item.nameRU
          .toLowerCase()
          .includes(search.toLowerCase());
        return isCheck ? searchName && item.duration <= 40 : searchName;
      })
    );
    console.log(filteredMovies);
    console.log(movies.filter((item) => {
      const searchName = item.nameRU
        .toLowerCase()
        .includes(search.toLowerCase());
      return isCheck ? searchName && item.duration <= 40 : searchName;
    }))
  }, []);

  function searchMovies(search) {
    if (theMovies.length === 0) {
      apiMovies
      .getMovies()
      .then((res) => {
        setTheMovies(res);
        setIsCheck(false);
        setFirstEntrance(false);
        filter(search, isCheck, res); 
        console.log(res);
        console.log(search);
      })
      .catch((err) => {
        console.error(`Ошибка при поиске ${err}`);
      });
  } }

   useEffect(() => {
    if (localStorage.theMovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.theMovies)
      const search = JSON.parse(localStorage.movie)
      const isCheck = JSON.parse(localStorage.shorts)
      setFirstEntrance(false)
      setNeededMovie(search)
      setIsCheck(isCheck)
      setTheMovies(movies)
      filter(search, isCheck, movies)
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
         isCheck={isCheck}
         setIsCheck={setIsCheck}
         filter={filter}
        /> 
        <MoviesCardList
          filteredMovies={filteredMovies}
          movies={theMovies}
          saveMovie={saveMovie}
          deleteMovie={deleteMovie}
          neededMovie={neededMovie}
          searchMovies={searchMovies}
        /> 
      </main>
      <Footer />
    </>
  );
}

export default Movies;
