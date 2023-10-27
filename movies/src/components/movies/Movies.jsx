import Footer from "../footer/Footer"
import Header from "../header/Header"
import MoviesCardList from "./moviesCardList/MoviesCardsList"
import SearchForm from "./searchForm/SearchForm"
import {moviesCardList} from "../../utils/constants"

function Movies() {

    return (
      <>
        <Header />
        <main className="main">
          <SearchForm />
          <MoviesCardList
          moviesCardList={moviesCardList}
  
          />
        </main>
        <Footer />
      </>
    )
  }
  
  export default Movies