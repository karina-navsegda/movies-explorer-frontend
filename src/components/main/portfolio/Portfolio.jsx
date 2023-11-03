import { Link } from "react-router-dom";

function Portfolio() {
    return (
        <section className="portfolio">
        <h3 className="portfolio__heading">Портфолио</h3>
        <div className="portfolio__list">
          <Link to="https://github.com/karina-navsegda/how-to-learn" className="portfolio__link" href="#" target="_blank">
            <p className="portfolio__link-name">Статичный сайт</p>
            <span className="portfolio__button">↗</span>
          </Link>
          <Link to="https://github.com/karina-navsegda/russian-travel" className="portfolio__link" href="#" target="_blank">
            <p className="portfolio__link-name">Адаптивный сайт</p>
            <span className="portfolio__button">↗</span>
          </Link>
          <Link to="https://github.com/karina-navsegda/react-mesto-api-full-gha" className="portfolio__link" href="#" target="_blank">
            <p className="portfolio__link-name">Одностраничное приложение</p>
            <span className="portfolio__button">↗</span>
          </Link>
        </div>
      </section>
    )
  }
  
  export default Portfolio

