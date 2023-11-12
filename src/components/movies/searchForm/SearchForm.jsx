import React, { useState, useEffect } from "react";
import searchIcon from "../../../images/search-2.svg";

function SearchForm({
  isShort,
  neededMovie,
  searchMovies,
  firstEntrance,
  movies,
  filter,
  setIsShort,
}) {
  const [film, setFilm] = useState("");
  const [isToggled, setIsToggled] = useState((localStorage.getItem("shorts")));

  useEffect(() => {
    const lastSearchedMovie = localStorage.getItem("movie");
    if (lastSearchedMovie) {
      setFilm(JSON.parse(lastSearchedMovie));
    }
  }, [isToggled]);

  function onSubmit(evt) {
    evt.preventDefault();
    if (evt.target.film.value) {
      searchMovies(evt.target.film.value);
      console.log("чето прорисходит");
    }
  }

  function changeShort() {
    if (isShort) {
      setIsShort(false);
      setIsToggled(false);
      filter(film, false, movies);
    } else {
      setIsShort(true);
      setIsToggled(true);
      filter(film, true, movies);
    }
  }

  function handleInputChange(e) {
    setFilm(e.target.value);
  }

  function handleChangeShort(e) {
    setIsToggled((localStorage.getItem("shorts")))
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
                value={film}
                onChange={handleInputChange}
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
              isShort={isShort}
            />
            <p className="searchForm__short-text">Короткометражки</p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
