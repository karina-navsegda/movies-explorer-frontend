import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import burger from "../../images/burger.svg"
import close from "../../images/close.svg"
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"

function Header() {
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
      setIsMobile(window.innerWidth < 768);
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
  }

  return (
    <header
      className={`header ${
        location.pathname === "/" ? "header_pink" : "header_white"
        }`}
    >
      <Link path ="/">
      <img className="header__logo" alt="логотип" src={logo} /> </Link>
      {isMobile ? (
        <div className="header__burger-menu">
          <button className="header__burger-button" onClick={toggleMenu}>
            <img className="header__burger-icon" src={burger} alt="меню"></img>
          </button>
          {isOpen && (
            <section className="nav">
             
            <div className="nav__content">
            <button className="nav__close">
                <img className="nav__close-icon" src={close} alt= "закрыть" onClick={closeMenu}/>
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
            </div>
            </section>
          )}
        </div>
      ) : (
        <div className="header__btns">
          
          <Link path="/signup" className="header__btn">Регистрация</Link>
          <Link path="/signin" className="header__btn-black">Войти</Link>
        </div>
      )}
    </header>
  );
} 

export default Header;