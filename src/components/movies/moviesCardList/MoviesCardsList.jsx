import { useLocation } from 'react-router-dom'
import MoviesCard from '../moviesCard/MoviesCard'
import { useEffect, useState } from 'react'


function MoviesCardList({ movies, saveMovie, filteredMovies, deleteMovie, savedMovies, filteredSaved }) {
  const { pathname } = useLocation()
  const isSavedMoviesPage = pathname === "/saved-movies";
  const [count, setCount] = useState('')
  const slice = filteredMovies ? filteredMovies.slice(0, count) : [];
  const sliceSaved = filteredSaved ? filteredSaved.slice(0, count) : [];


  function printCards() {
    let counter = { init: 12, step: 3 }
    const maxScreen = 1280
    const mediumScreen = 768
    const smallScreen = 480
  
    if (window.innerWidth < maxScreen) {
      counter.init = 9
      counter.step = 3
    }
    if (window.innerWidth < mediumScreen) {
      counter.init = 6
      counter.step = 2
    }
    if (window.innerWidth < smallScreen) {
      counter.init = 5
      counter.step = 2
    }
    return counter
  }

  useEffect(() => {
    if (pathname === '/movies') {
      setCount(printCards().init)
      function printCardsForResize() {
        if (window.innerWidth >= 1280) {
          setCount(9)
        }
        if (window.innerWidth < 1280 && window.innerWidth >= 768) {
          setCount(6)
        }
        if (window.innerWidth < 768) {
          setCount(5)
        }
      }
      window.addEventListener('resize', printCardsForResize)
      return () => window.removeEventListener('resize', printCardsForResize)
    }
  }, [pathname, movies])

  function clickMore() {
    setCount(count + printCards().step)
  }

  return (
    <section className="moviesCardList">
      <div className="moviesCardList__grid">
        {isSavedMoviesPage
          ? sliceSaved.length > 0 &&
            sliceSaved.map((data) => (
              <MoviesCard
                key={data._id}
                movie={data}
                filteredMovies={filteredMovies}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                savedMovies={savedMovies}
                filteredSaved={filteredSaved}
              />
            ))
          : slice.length > 0 &&
            slice.map((data) => (
              <MoviesCard
                key={data._id}
                movie={data}
                filteredMovies={filteredMovies}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                savedMovies={savedMovies}
                filteredSaved={filteredSaved}
              />
            ))}
      </div>
      <button className="moviesCardList__more-btn" onClick={clickMore}>
        Ещё
      </button>
    </section>
  );
  }
  
  export default MoviesCardList