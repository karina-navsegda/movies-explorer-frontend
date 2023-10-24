import pointer from "../../../images/pointer.svg";
import { Link } from "react-router-dom";

function Portfolio() {
    return (
        <section className="portfolio">
        <h3 className="portfolio__heading">Портфолио</h3>
        <div className="portfolio__list">
          <Link to="https://github.com/karina-navsegda/how-to-learn" className="portfolio__link" href="#">
            <p className="portfolio__link-name">Статичный сайт</p>
            <img className="portfolio__icon" src={pointer} alt="стрелка" />
          </Link>
          <Link to="https://github.com/karina-navsegda/russian-travel" className="portfolio__link" href="#">
            <p className="portfolio__link-name">Адаптивный сайт</p>
            <img className="portfolio__icon" src={pointer} alt="стрелка" />
          </Link>
          <Link to="https://github.com/karina-navsegda/react-mesto-api-full-gha" className="portfolio__link" href="#">
            <p className="portfolio__link-name">Одностраничное приложение</p>
            <img className="portfolio__icon" src={pointer} alt="стрелка" />
          </Link>
        </div>
      </section>
    )
  }
  
  export default Portfolio

