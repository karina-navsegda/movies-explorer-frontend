import React, { useState } from 'react';
import searchIcon from "../../../images/search-2.svg"

function SearchForm() {
  const [isShort, setIsShort] = useState(false);

  const handleToggle = () => {
    setIsShort(!isShort);
  }

  return (
    <section className="searchForm">
      <div className="searchForm__line">
        <form className="searchForm__form">
          <div className="searchForm__search-stroke">
            <div className="searchForm__film-name">
              <img className="searchForm__search-icon" src={searchIcon} alt="иконка" />
              <input className="searchForm__name" type="text" placeholder="Фильм" name="search-film" required/>
            </div>
            <button className="searchForm__search-btn">Найти</button>
          </div>
          <div className="searchForm__short">
          <button className={`searchForm__toggle ${isShort ? 'searchForm__toggle_active' : ''}`} onClick={handleToggle} />
            <p className="searchForm__short-text">Короткометражки</p>
          </div>
        </form>
      </div>
    </section>
  )

  }
  
  export default SearchForm