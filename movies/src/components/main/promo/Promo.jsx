import kv from "../../../images/kv.svg"

function Promo() {
  return (
    <section className="intro">
    <img className="intro__kv" src={kv} alt="векторная иллюстрация" />
    <h1 className="intro__title">
      Учебный проект студента факультета Веб-разработки.
    </h1>
    <nav className="intro__nav">
      <a className="intro__link" href='#about'>О проекте</a>
      <a className="intro__link" href='#tech'>Технологии</a>
      <a className="intro__link" href='#me'>Студент</a>
    </nav>
  </section>
  )
}

export default Promo