import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.svg";

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isValid, setIsValid] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
    validateForm();
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    validateForm();
  }

  function validateForm() {
    setIsValid(true); // Reset isValid at the start of validation
    setEmailError("");
    setPasswordError("");

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
      onLogin({ password, email });
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-page__logo-sec">
        <Link to="/" className="auth-page__logo">
          <img className="auth-page__img" src={logo} alt="логотип" />
        </Link>
        <h2 className="auth-page__title">Рады видеть!</h2>
      </div>
      <form className="auth-page__form" onSubmit={handleSubmitClick} noValidate>
        <fieldset className="auth-page__fieldset">
          <label className="auth-page__label">E-mail</label>
          <input
            type="email"
            className="auth-page__input"
            placeholder="pochta@yandex.ru|"
            name="register-mail"
            required={true}
            minLength={2}
            maxLength={40}
            value={email}
            id="register-mail-input"
            onChange={handleEmailChange}
          />
          <span className="auth-page__form-error login-mail-error">
            {emailError}
          </span>{" "}
          <label className="auth-page__label">Пароль</label>
          <input
            type="password"
            className="auth-page__input"
            placeholder="********"
            value={password}
            name="register-password"
            required={true}
            minLength={5}
            maxLength={20}
            id="register-password-input"
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
          Войти
        </button>
      </form>
      <div className="auth-page__btns">
        <p className="auth-page__p">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="auth-page__btn">
          Регистрация
        </Link>
      </div>
    </section>
  );
}
