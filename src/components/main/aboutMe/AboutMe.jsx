import me from "../../../images/me.jpg";
import { Link } from "react-router-dom";
function AboutMe() {
  return (
    <section className="me" id="me">
      <h2 className="me__title">Студент</h2>
      <div className="me__profile">
        <div className="me__text">
          <div className="me__info">
            <p className="me__name">Карина</p>
            <p className="me__prof">Веб-дизайнер) 24 года</p>
            <p className="me__about">
              Я родился в Москве в 70-м на краю города, закончил факультет
              социологии СПБГУ. У меня нет жены и дочери. Я люблю слушать
              музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года
              работал в компании «СКБ Контур». После того, как прошёл курс по
              веб-разработке, начал заниматься фриланс-заказами и ушёл с
              постоянной работы.
            </p>
          </div>
          <Link to="https://github.com/karina-navsegda" className="me__disclaimer" target="_blank">Github</Link>
        </div>
        <img className="me__photo" src={me} alt="Тут моя фотография" />
      </div>
    </section>
  );
}

export default AboutMe;
