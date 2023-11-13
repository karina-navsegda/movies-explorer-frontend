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
  const isSavedMoviesPage = location.pathname === "/saved-movies";

  useEffect(() => {
    const savedState = localStorage.getItem(`isSaved-${movie.id}`);
    if (savedState) {
      setSaved(savedState === 'true');
    }
  }, [movie.id]);

  function handleSave() {
    if (isSaved) {
      setSaved(false);
      saveMovie(movie);
      localStorage.setItem(`isSaved-${movie.id}`, 'false');
    } else {
      setSaved(true);
      saveMovie(movie);
      localStorage.setItem(`isSaved-${movie.id}`, 'true');
    }
  } 



  return (
    <div className="moviesCardList__card">
      <div className="moviesCardList__img-block">
        <img
          className="moviesCardList__img"
          src={isSavedMoviesPage ? movie.data.image : `https://api.nomoreparties.co${movie.image.url}`}
          alt={movie.nameRU}
        />
        {location.pathname === "/saved-movies" ? (
          <button
            className="moviesCardList__btn-delete"
            onClick={() => deleteMovie(movie.data._id)}
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
        <p className="moviesCardList__name">{isSavedMoviesPage ? movie.data.nameRU : movie.nameRU}</p>
        <div className="moviesCardList__duration">{isSavedMoviesPage ? movie.data.duration : movie.duration}</div>
      </div>
    </div>
  );
}
export default MoviesCard;
