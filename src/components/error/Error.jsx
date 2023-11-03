import { Link } from "react-router-dom";

export function Error() {
    return (
       <section className="error">
        <div className="error__text">
            <h2 className="error__title">404</h2>
            <p className="error__p">Страница не найдена</p>
        </div>
        <Link to="/" className="error__btn">Назад</Link>
       </section>
      
    )
  }
  