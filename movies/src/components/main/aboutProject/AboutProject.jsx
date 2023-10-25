
function AboutProject() {
    return (
        <section className="about" id="about">
        <h2 className="about__title section__title">О проекте</h2>
        <div className="about__columns">
          <div className="about__text">
            <h3 className="about__heading">Дипломный проект включал 5 этапов</h3>
            <p className="about__p">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about__text">
            <h3 className="about__heading">На выполнение диплома ушло 5 недель</h3>
            <p className="about__p">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about__time-block">
          <div className="about__timeline">
            <div className="about__progress">
              <div className="about__timeline_black">
                <p className="about__timeline-text">1 неделя</p>
              </div>
              <div className="about__timeline_clear">
                <p className="about__timeline-text about__timeline-text_black">
                  4 недели
                </p>
              </div>
            </div>
          </div>
          <div className="about__progress">
            <div className="about__timeline_back">
              <p className="about__subtext">Back-end</p>
            </div>
            <div className="about__timeline_front">
              <p className="about__subtext">Front-end</p>
            </div>
          </div>
        </div>
      </section>
      
    )
  }
  
  export default AboutProject