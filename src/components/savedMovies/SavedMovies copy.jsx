/* import Header from "../header/Header";
import SearchForm from "../movies/searchForm/SearchForm"
import MoviesCardList from "../movies/moviesCardList/MoviesCardsList";
import Footer from "../footer/Footer"
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";

function SavedMovies({ savedMovies, deleteMovie, isLogged }) {
  const [filteredSaved, setFilteredSaved] = useState(
    JSON.parse(localStorage.getItem("addedMovies")) || []
  );
  const [neededMovie, setNeededMovie] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [firstEntrance, setFirstEntrance] = useState(true);

  // Move filter outside of the component to avoid recreation on each render
  const filter = useCallback((search, isShort, movies) => {
    return movies.filter((item) => {
      const searchName = item.data.nameRU.toLowerCase().includes(search.toLowerCase());
      return isShort ? (searchName && item.duration <= 40) : searchName;
    });
  }, []);

  // Use useEffect to handle side effects
  useEffect(() => {
    if (savedMovies.length === 0) {
      setFirstEntrance(true);
      setFilteredSaved([]); // Reset filteredSaved when savedMovies is empty
    } else {
      setFirstEntrance(false);
      setFilteredSaved(filter(neededMovie, isShort, savedMovies));
    }
  }, [savedMovies, isShort, neededMovie, filter]);

  // Update filteredSaved when searchMovies is called
  function searchMovies(search) {
    setFirstEntrance(false);
    setFilteredSaved(filter(search, isShort, savedMovies));
    setNeededMovie(search);
  }

  useEffect(() => {
    localStorage.setItem("addedMovies", JSON.stringify(filteredSaved));
  }, [filteredSaved]);

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
        /> 
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies */