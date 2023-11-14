import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import SavedMovies from "../../savedMovies/SavedMovies";
import apiMain from "../../../utils/MainApi";

function MoviesCard({
  movie,
  saveMovie,
  filteredMovies,
  deleteMovie,
  savedMovies,
  setSavedMovies, 
}) {
  const location = useLocation();
  const [isSaved, setSaved] = useState(false);

  useEffect(() => {
    if (location.pathname === '/movies') {
      apiMain.getMovies(localStorage.token)
        .then((dataMovies) => {
          const isMovieSaved = dataMovies.some(element => movie.nameRU === element.nameRU);
          setSaved(isMovieSaved);
        })
        .catch((error) => {
          console.error('Error fetching saved movies:', error);
        });
    }
  }, [movie.id, setSaved, location.pathname]);


  function handleSave() {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
  
    if (isSaved) {
      const updatedSavedMovies = savedMovies.filter((savedMovie) => savedMovie.id !== movie.id);
      setSaved(false);
      saveMovie(movie);
      localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
    } else {
      const updatedSavedMovies = [...savedMovies, movie];
      setSaved(true);
      saveMovie(movie);
      localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
    }
  }
 

  return (
    <div className="moviesCardList__card">
      <div className="moviesCardList__img-block">
          <img
          className="moviesCardList__img"
          src={location.pathname === '/movies' ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}
          alt={movie.nameRU}
        />
        {location.pathname === "/saved-movies" ? (
          <button
            className="moviesCardList__btn-delete"
            onClick={() => deleteMovie(movie._id)}
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
        <p className="moviesCardList__name">{ movie.nameRU }</p>
        <div className="moviesCardList__duration">{ movie.duration }</div>
      </div>
    </div>
  );
}
export default MoviesCard;
