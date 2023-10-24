import { useLocation } from "react-router-dom";
import React, { useState } from "react";


function MoviesCard({ movieCard }) {
  const location = useLocation();
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="moviesCardList__card">
      <div className="moviesCardList__img-block">
        <img className="moviesCardList__img" src={movieCard.image} alt={movieCard.nameRu} />
        <button className={saved ? "moviesCardList__btn-save" : "moviesCardList__btn-saved"} onClick={handleSave}>
          Сохранить
        </button>
      </div>
      <div className="moviesCardList__text">
        <p className="moviesCardList__name">{movieCard.nameRu}</p>
        <div className="moviesCardList__duration">{movieCard.duration}</div>
      </div>
    </div>
  );
}

export default MoviesCard;