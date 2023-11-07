 import Header from "../header/Header";
import SearchForm from "../movies/searchForm/SearchForm"
import MoviesCardList from "../movies/moviesCardList/MoviesCardsList";
import Footer from "../footer/Footer"
import { useEffect, useState } from "react";
import { useCallback } from "react";

function SavedMovies({savedMovies, deleteMovie, isLogged}) {
  const [filteredSaved, setFilteredSaved] = useState(savedMovies)
  const [neededMovie, setNeededMovie] = useState('')
  const [isShort, setIsShort] = useState(false)
  const [firstEntrance, setFirstEntrance] = useState(true)

  const filter = useCallback((search, isShort, movies) => {
    setNeededMovie(search)
    setFilteredSaved(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isShort ? (searchName && movie.duration <= 40) : searchName
    }))
  }, [])

  function searchMovies(search) {
    setFirstEntrance(false)
    filter(search, isShort, savedMovies)
  }

  useEffect(() => {
    if (savedMovies.length === 0) {
      setFirstEntrance(true)
    } else {
      setFirstEntrance(false)
    }
    filter(neededMovie, isShort, savedMovies)
  }, [filter, savedMovies, isShort, neededMovie])

    return (
      <>
        <Header isLogged={isLogged}/>
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
               movies={filteredSaved}
               deleteMovie={deleteMovie}
               firstEntrance={firstEntrance}
         /> 
        </main>
        <Footer />
      </>
    )
  }
  
  export default SavedMovies 