import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"

export function Login() {
    return (
        <section className="auth-page">
        <div className="auth-page__logo-sec">
            <Link to="/" className='auth-page__logo'>
                <img className="auth-page__img" src={logo} alt="логотип"/>
                </Link>
                <h2 className="auth-page__title">Рады видеть!</h2>
                </div>
                <form className="auth-page__form">
               
                <fieldset className="auth-page__fieldset">
                    <label className="auth-page__label">E-mail</label>
                        <input
                        type="email"
                        className="auth-page__input"
                        placeholder="pochta@yandex.ru|"
                        defaultValue=""
                        name="register-mail"
                        required=""
                        minLength={2}
                        maxLength={40}
                        id="register-mail-input"
                        />
                   <span className="form-error register-mail-error"/> 
                   <label className="auth-page__label">Пароль</label>
                        <input
                        type="email"
                        className="auth-page__input"
                        placeholder=""
                        defaultValue=""
                        name="register-password"
                        required=""
                        minLength={2}
                        maxLength={40}
                        id="register-password-input"
                        />
                   <span className="form-error register-password-error"/> 
                  
                </fieldset>
                <Link to='/movies' className="auth-page__form-btn">Войти</Link>
                </form>
                <div className="auth-page__btns">
                    <p className="auth-page__p">Ещё не зарегистрированы?</p>
                    <Link to='/signup' className="auth-page__btn">Регистрация</Link>
                </div>
        </section>
    )
    
}