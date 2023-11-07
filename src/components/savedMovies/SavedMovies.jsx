/* import Header from "../header/Header";
import SearchForm from "../movies/searchForm/SearchForm"
import MoviesCardList from "../movies/moviesCardList/MoviesCardsList";
import Footer from "../footer/Footer"
import { useEffect, useState } from "react";
import { useCallback } from "react";

function SavedMovies({savedMovies, deleteMovie, isLogged}) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  const [searchedMovie, setSearchedMovie] = useState('')
  const [isCheck, setIsCheck] = useState(false)
  const [firstEntrance, setFirstEntrance] = useState(true)

  const filter = useCallback((search, isCheck, movies) => {
    setSearchedMovie(search);
    localStorage.setItem("movie", JSON.stringify(search));
    localStorage.setItem("shorts", JSON.stringify(isCheck));
    localStorage.setItem("theMovies", JSON.stringify(movies));
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
    setFirstEntrance(false)
    filter(search, isCheck, savedMovies)
  }

  useEffect(() => {
    if (savedMovies.length === 0) {
      setFirstEntrance(true)
    } else {
      setFirstEntrance(false)
    }
    filter(searchedMovie, isCheck, savedMovies)
  }, [filter, savedMovies, isCheck, searchedMovie])

    return (
      <>
        <Header isLogged={isLogged}/>
        <main className="main">
          <SearchForm 
             isCheck={isCheck}
             searchMovies={searchMovies}
             searchedMovie={searchedMovie}
             firstEntrance={firstEntrance}
             savedMovies={savedMovies}
             movies={savedMovies}
             filter={filter}
             setIsCheck={setIsCheck}
        />
         <MoviesCardList 
               movies={filteredMovies}
               deleteMovie={deleteMovie}
               firstEntrance={firstEntrance}
         /> 
        </main>
        <Footer />
      </>
    )
  }
  
  export default SavedMovies */