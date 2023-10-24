import Header from "../header/Header";
import SearchForm from "../movies/searchForm/SearchForm"
import MoviesCardList from "../movies/moviesCardList/MoviesCardsList";
import { moviesCardList } from "../../utils/constants"
import Footer from "../footer/Footer"

function SavedMovies() {

    const savedMoviesList = moviesCardList.filter((movieCard) => movieCard.saved)
  
    return (
      <>
        <Header />
        <main className="main">
          <SearchForm />
          <MoviesCardList moviesCardList={savedMoviesList} />
        </main>
        <Footer />
      </>
    )
  }
  
  export default SavedMovies