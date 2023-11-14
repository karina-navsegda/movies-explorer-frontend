import { useLocation } from "react-router-dom";
import MoviesCard from "../moviesCard/MoviesCard";
import { useEffect, useState } from "react";
import Preloader from "../../preloader/Preloader";

function MoviesCardList({
  movies,
  saveMovie,
  filteredMovies,
  deleteMovie,
  savedMovies,
  filteredSaved,
  isDownloading,
  setSavedMovies,
  moviesToRender
}) {
  const { pathname } = useLocation();
  const [count, setCount] = useState("");
  const slice = filteredMovies ? filteredMovies.slice(0, count) : [];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const debouncedHandleResize = debounce(handleResize, 300);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  useEffect(() => {
    setCount(printCards().init);
  }, [windowWidth, filteredMovies]);

  useEffect(() => {
    if (pathname === "/movies" || pathname === "/saved-movies") {
      setCount(printCards().init);
    }
  }, [pathname, movies]);

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function printCards() {
    let counter = { init: 12, step: 3, cardsInRow: 4 };
    const maxScreen = 1280;
    const mediumScreen = 800;
    const smallScreen = 480;

    if (windowWidth < maxScreen) {
      counter.init = 12;
      counter.step = 3;
      counter.cardsInRow = 4;
    }
    if (windowWidth < mediumScreen) {
      counter.init = 8;
      counter.step = 2;
      counter.cardsInRow = 3;
    }
    if (windowWidth < smallScreen) {
      counter.init = 5;
      counter.step = 2;
      counter.cardsInRow = 2;
    }
    return counter;
  }

  function clickMore() {
    setCount(count + printCards().step);
  }

  return (
    <section className="moviesCardList">
      <div className="moviesCardList__grid">
        {isDownloading ? (
          <Preloader />
        ) : (
          slice.length > 0 &&
          slice.map((data) => (
            <MoviesCard
              movie={data}
              filteredMovies={filteredMovies}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
              savedMovies={savedMovies}
              filteredSaved={filteredSaved}
              setSavedMovies={setSavedMovies}
            />
          ))
        )}
      </div>
      {filteredMovies && filteredMovies.length > count && (
        <button className="moviesCardList__more-btn" onClick={clickMore}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
