import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import burger from "../../images/burger-mini.svg";
import close from "../../images/close.svg";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import profile from "../../images/profile.svg";

function Header({isLogged}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`header ${location.pathname === "/" ? "header_pink" : "header_white"}`}>
      <Link to="/">
        <img className="header__logo" alt="логотип" src={logo} />
      </Link>
      {isMobile ? (
        <div className="header__burger-menu">
          <button className="header__burger-button" onClick={toggleMenu}>
            <img className="header__burger-icon" src={burger} alt="меню"></img>
          </button>
          {isOpen && (
            <section className="nav">
              <div className="nav__content">
                <button className="nav__close">
                  <img
                    className="nav__close-icon"
                    src={close}
                    alt="закрыть"
                    onClick={closeMenu}
                  />
                </button>
                <ul className="nav__list">
                  <Link to="/" className="nav__item">
                    Главная
                  </Link>
                  <Link to="/movies" className="nav__item">
                    Фильмы
                  </Link>
                  <Link to="/saved-movies" className="nav__item">
                    Сохраненные фильмы
                  </Link>
                </ul>
                <Link to="/profile" className="header__btn-acc">
                  Аккаунт{" "}
                  <img
                    className="header__acc-img"
                    src={profile}
                    alt="аккаунт"
                  />
                </Link>
              </div>
            </section>
          )}
        </div>
      )  : (
        <div className="header__btns">
          {isLogged ? (
            <>
              <Link to="/movies" className="header__btn-text">
                Фильмы
              </Link>
              <Link to="/saved-movies" className="header__btn-text">
                Сохраненные фильмы
              </Link>
              <Link to="/profile" className="header__btn-acc">
                Аккаунт
                <img className="header__acc-img" src={profile} alt="аккаунт" />
              </Link>
            </>
          ) : (
            <>
            <Link to="/signin" className="header__btn-text">
              Регистрация
            </Link>
                <Link to="/signin" className="header__btn-black">
                Войти
              </Link>
              </>
          )}
        </div>
      )}
    </header>
  );
  
}

export default Header;
