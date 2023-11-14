import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="footer">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__content">
          <p className="footer__p">© 2020</p>
          <div className="footer__links">
            <Link to="https://practicum.yandex.ru" className="footer__p footer__link" target="_blank">Яндекс.Практикум</Link>
            <Link to="https://github.com/karina-navsegda" className="footer__p footer__link" target="_blank">Github</Link>
          </div>
        </div>
      </footer>
      
    )
  }
  
  export default Footer