 import Header from "../header/Header";
import SearchForm from "../movies/searchForm/SearchForm"
import MoviesCardList from "../movies/moviesCardList/MoviesCardsList";
import Footer from "../footer/Footer"
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";

function SavedMovies({ savedMovies, deleteMovie, isLogged }) {
  const [filteredSaved, setFilteredSaved] = useState(savedMovies)
  const [neededMovie, setNeededMovie] = useState('')
  const [isShort, setIsShort] = useState(false)
  const [firstEntrance, setFirstEntrance] = useState(true)

  const filter = useCallback((search, isShort, movies) => {
    setNeededMovie(search)
    setFilteredSaved(movies.filter((item) => {
      const searchName = item.data.nameRU.toLowerCase().includes(search.toLowerCase())
      return isShort ? (searchName && item.duration <= 40) : searchName
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
    console.log(neededMovie, isShort, savedMovies)
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
               filteredMovies={filteredSaved}
               deleteMovie={deleteMovie}
               firstEntrance={firstEntrance}
             //  movies={filteredSaved}
         /> 
        </main>
        <Footer />
      </>
    )
  }
  
  export default SavedMovies 