import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.svg";

export function Register({ onRegister }) {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmitClick(e) {
    e.preventDefault();
    onRegister({ name, password, email });
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
              onChange={handleNameChange}
            />
            <span className="form-error login-name-error" />
            <label className="auth-page__label">E-mail</label>
            <input
              type="email"
              className="auth-page__input"
              placeholder="pochta@yandex.ru"
              name="login-mail"
              required={true}
              minLength={2}
              maxLength={40}
              id="login-mail-input"
              onChange={handleEmailChange}
            />
            <span className="form-error login-mail-error" />
            <label className="auth-page__label">Пароль</label>
            <input
              type="password"
              className="auth-page__input"
              placeholder=""
              defaultValue=""
              name="login-password"
              required={true}
              minLength={2}
              maxLength={40}
              id="login-password-input"
              onChange={handlePasswordChange}
            />
            <span className="form-error login-password-error" />
          </fieldset>
          <button className="auth-page__form-btn" type="submit">
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
