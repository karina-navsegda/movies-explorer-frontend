import MoviesCard from "../moviesCard/MoviesCard"


function MoviesCardList({ moviesCardList }) {
    return (
        <section className="moviesCardList">
        <div className="moviesCardList__grid">
        {moviesCardList.map(card => (<MoviesCard key={card['id']} movieCard={card} />))} 
        </div>
        <button className="moviesCardList__more-btn">Ещё</button>
      </section>
      
      
    )
  }
  
  export default MoviesCardList