import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.svg";

export function Register({ onRegister }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isValid, setIsValid] = useState(false); 

  function handleEmailChange(e) {
    setEmail(e.target.value);
    validateForm();
  }

  function handleNameChange(e) {
    setName(e.target.value);
    validateForm();
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    validateForm();
  }
  function validateForm() {
    setIsValid(true); 
    setNameError("");
    setEmailError("");
    setPasswordError("");

    if (!/^[-a-zA-Zа-яА-Я\s]+$/.test(name)) {
      setIsValid(false);
      setNameError(
        "Имя должно содержать от 2 до 40 символов, латиницу, кириллицу, пробел или дефис."
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setIsValid(false);
      setEmailError("Неправильный формат электронной почты.");
    }

    if (password.length < 5 || password.length > 20) {
      setIsValid(false);
      setPasswordError("Пароль должен содержать от 5 до 20 символов.");
    }
  }

  function handleSubmitClick(e) {
    e.preventDefault();
    validateForm(); // Call validateForm to update isValid
    if (isValid) {
      onRegister({ name, password, email });
    }
  }
  return (
    <main className="main">
      <section className="auth-page">
        <div className="auth-page__logo-sec">
          <Link to="/" className="auth-page__logo">
            <img className="auth-page__img" src={logo} alt="логотип" />
          </Link>
          <h2 className="auth-page__title">Добро пожаловать!</h2>
        </div>

        <form
          className="auth-page__form"
          noValidate
          onSubmit={handleSubmitClick}
        >
          <fieldset className="auth-page__fieldset">
            <label className="auth-page__label">Имя</label>
            <input
              type="name"
              className="auth-page__input"
              placeholder="Карина"
              name="login-name"
              required={true}
              minLength={2}
              maxLength={40}
              id="login-name-input"
              value={name}
              onChange={handleNameChange}
            />
            <span className="auth-page__form-error login-name-error">
              {nameError}
            </span>{" "}
            <label className="auth-page__label">E-mail</label>
            <input
              type="email"
              className="auth-page__input"
              placeholder="pochta@yandex.ru"
              name="login-mail"
              required={true}
              minLength={2}
              maxLength={40}
              value={email}
              id="login-mail-input"
              onChange={handleEmailChange}
            />
            <span className="auth-page__form-error login-mail-error">
              {emailError}
            </span>{" "}
            <label className="auth-page__label">Пароль</label>
            <input
              type="password"
              className="auth-page__input"
              placeholder=""
              defaultValue=""
              name="login-password"
              required={true}
              minLength={5}
              maxLength={20}
              id="login-password-input"
              onChange={handlePasswordChange}
            />
            <span className="auth-page__form-error login-password-error">
              {passwordError}
            </span>
          </fieldset>
          <button
            className={
              isValid ? "auth-page__form-btn" : "auth-page__form-btn_disabled"
            }
            type="submit"
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="auth-page__btns">
          <p className="auth-page__p">Уже зарегистрированы?</p>

          <Link to="/signin" className="auth-page__btn">
            Войти
          </Link>
        </div>
      </section>
    </main>
  );
}
