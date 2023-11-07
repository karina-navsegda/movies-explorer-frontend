import React, { useState } from "react";
import searchIcon from "../../../images/search-2.svg";

function SearchForm({
  isCheck,
  neededMovie,
  searchMovies,
  firstEntrance,
  movies,
  filter,
  setIsCheck,
}) {
  const [film, setFilm] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  function onSubmit(evt) {
    evt.preventDefault();
    if (evt.target.film.value) {
      searchMovies(evt.target.film.value);
      console.log("чето прорисходит");
    }
  }

  function changeShort() {
    if (isCheck) {
      setIsCheck(false);
      setIsToggled(false);
      filter(film, false, movies);
    } else {
      setIsCheck(true);
      setIsToggled(true);
      filter(film, true, movies);
    }
  }

  return (
    <section className="searchForm">
      <div className="searchForm__line">
        <form className="searchForm__form" onSubmit={onSubmit}>
          <div className="searchForm__search-stroke">
            <div className="searchForm__film-name">
              <img
                className="searchForm__search-icon"
                src={searchIcon}
                alt="иконка"
              />
              <input
                className="searchForm__name"
                type="text"
                placeholder="Фильм"
                name="film"
                id="film"
                required
                //   value={film}
                // onChange={(e) => setFilm(e.target.value)}
              />
            </div>
            <button className="searchForm__search-btn" type="submit">
              Найти
            </button>
          </div>
          <div className="searchForm__short">
            <button
              className={`searchForm__toggle ${
                isToggled ? "searchForm__toggle_active" : ""
              }`}
              onClick={changeShort}
              firstEntrance={firstEntrance}
              isCheck={isCheck}
            />
            <p className="searchForm__short-text">Короткометражки</p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
