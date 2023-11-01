import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.svg"

export function Login({ onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function handleEmailChange(e) {
      setEmail(e.target.value);
    }
  
    function handlePasswordChange(e) {
      setPassword(e.target.value);
    }
  
    function handleSubmitClick(e) {
      e.preventDefault();
      onLogin({ email, password });
    }

    return (
        <section className="auth-page">
        <div className="auth-page__logo-sec">
            <Link to="/" className='auth-page__logo'>
                <img className="auth-page__img" src={logo} alt="логотип"/>
                </Link>
                <h2 className="auth-page__title">Рады видеть!</h2>
                </div>
                <form className="auth-page__form"
                onSubmit={handleSubmitClick}>
               
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
                   <span className="form-error register-mail-error"/> 
                   <label className="auth-page__label">Пароль</label>
                        <input
                        type="password"
                        className="auth-page__input"
                        placeholder="********"
                        value={password}
                        name="register-password"
                        required={true}
                        minLength={2}
                        maxLength={40}
                        id="register-password-input"
                        onChange={handlePasswordChange}
                        />
                   <span className="form-error register-password-error"/> 
                  
                </fieldset>
                <button className="auth-page__form-btn" type="submit">Войти</button>
                </form>
                <div className="auth-page__btns">
                    <p className="auth-page__p">Ещё не зарегистрированы?</p>
                    <Link to='/signup' className="auth-page__btn">Регистрация</Link>
                </div>
        </section>
    )
    
}