import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";

function MoviesCard({
  movie,
  saveMovie,
  filteredMovies,
  deleteMovie,
  savedMovies,
  setSavedMovies
}) {
  const location = useLocation();
  const [isSaved, setSaved] = useState(false);

  useEffect(() => {
    if (location === '/movies')
      setSaved(savedMovies.some(element => movie.id === element.movieId))
  }, [savedMovies, movie.id, setSaved, location])

  function handleSave() {
    if (savedMovies.some((element) => movie.id === element.data.movieId)) {
      console.log(savedMovies)
      console.log(movie)
      setSaved(false);
      console.log("not saved");
      saveMovie(movie);
    } else {
      setSaved(true);
      console.log("saved");
      saveMovie(movie);
      console.log(movie.id)
      console.log(savedMovies)
    }
  } 


  return (
    <div className="moviesCardList__card">
      <div className="moviesCardList__img-block">
        <img
          className="moviesCardList__img"
          src={`https://api.nomoreparties.co${movie.image.url}`}
          alt={movie.nameRU}
        />
        {location.pathname === "/saved-movies" ? (
          <button
            className="moviesCardList__btn-delete"
            onClick={deleteMovie}
          ></button>
        ) : isSaved ? (
          <button
            className="moviesCardList__btn-saved"
            onClick={handleSave}
          ></button>
        ) : (
          <button className="moviesCardList__btn-save" onClick={handleSave}>
            Сохранить
          </button>
        )}
      </div>
      <div className="moviesCardList__text">
        <p className="moviesCardList__name">{movie.nameRU}</p>
        <div className="moviesCardList__duration">{movie.duration}</div>
      </div>
    </div>
  );
}
export default MoviesCard;
