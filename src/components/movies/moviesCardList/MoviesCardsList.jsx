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
  setSavedMovies
}) {
  const { pathname } = useLocation();
  const isSavedMoviesPage = pathname === "/saved-movies";
  const [count, setCount] = useState("");
  const slice = filteredMovies ? filteredMovies.slice(0, count) : [];
  const sliceSaved = savedMovies ? savedMovies.slice(0, count) : [];

  function printCards() {
    let counter = { init: 12, step: 3 };
    const maxScreen = 1280;
    const mediumScreen = 768;
    const smallScreen = 480;

    if (window.innerWidth < maxScreen) {
      counter.init = 12;
      counter.step = 4;
    }
    if (window.innerWidth < mediumScreen) {
      counter.init = 12;
      counter.step = 3;
    }
    if (window.innerWidth < smallScreen) {
      counter.init = 5;
      counter.step = 2;
    }
    return counter;
  }

  useEffect(() => {
    if (pathname === "/movies") {
      setCount(printCards().init);
      function printCardsForResize() {
        if (window.innerWidth >= 1280) {
          setCount(12);
        }
        if (window.innerWidth < 1280 && window.innerWidth >= 768) {
          setCount(12);
        }
        if (window.innerWidth < 768) {
          setCount(5);
        }
      }
      window.addEventListener("resize", printCardsForResize);
      return () => window.removeEventListener("resize", printCardsForResize);
    }
  }, [pathname, movies]);

  function clickMore() {
    setCount(count + printCards().step);
  }

  return (
    <section className="moviesCardList">
      <div className="moviesCardList__grid">
        {isDownloading ? (
          <Preloader />
        ) : isSavedMoviesPage ? (
          sliceSaved.length > 0 &&
          sliceSaved.map((data) => (
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
      <button className="moviesCardList__more-btn" onClick={clickMore}>
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
