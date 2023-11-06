import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import searchIcon from "../../../images/search-2.svg"
import useFormValidation from '../../../hook/validation'

function SearchForm({isCheck, searchedMovie, searchMovies, setIsError, firstEntrance, savedMovies, movies, filter, setIsCheck}) {
  const [isShort, setIsShort] = useState(false);

  const handleToggle = () => {
    setIsShort(!isShort);
  }

  const { pathname } = useLocation()
  const { values, handleChange, reset } = useFormValidation()

  useEffect(() => {
    if ((pathname === '/saved-movies' && savedMovies.length === 0)) {
      reset({ search: '' })
    } else {
      reset({ search: searchedMovie })
    }
/*     setIsError(false) */
  }, [searchedMovie, reset, setIsError, pathname, savedMovies])

  function onSubmit(evt) {
    evt.preventDefault()
    if (evt.target.film.value) {
      searchMovies(evt.target.film.value)
      console.log("чето прорисходит")
     // setIsError(false)
    } else {
     // setIsError(true)
    }
  }

  function changeShort() {
    if (isCheck) {
      setIsCheck(false)
      filter(values.search, false, movies)
    } else {
      setIsCheck(true)
      filter(values.search, true, movies)
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
                name="search-film"
                id="film"
                required
              />
            </div>
            <button className="searchForm__search-btn" type="submit">
              Найти
            </button>
          </div>
          <div className="searchForm__short">
            <button
              className={`searchForm__toggle ${
                isShort ? "searchForm__toggle_active" : ""
              }`}
              onClick={handleToggle}
              changeShort={changeShort}
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
