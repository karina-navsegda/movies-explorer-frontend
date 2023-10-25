import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg"

export function Register() {
    const location = useLocation();
    
    return (
        <main className="main">
        <section className="auth-page">
           <div className="auth-page__logo-sec">
            <Link to="/" className='auth-page__logo'>
                <img className="auth-page__img" src={logo} alt="логотип"/>
                </Link>
                <h2 className="auth-page__title">Добро пожаловать!</h2>
                </div>
             
                <form className="auth-page__form">
                <fieldset className="auth-page__fieldset">
                    <label className="auth-page__label">Имя</label>
                        <input
                        type="text"
                        className="auth-page__input"
                        placeholder="Карина"
                        defaultValue=""
                        name="login-name"
                        required=""
                        minLength={2}
                        maxLength={40}
                        id="login-name-input"
                        />
                   <span className="form-error login-name-error"/> 
                   <label className="auth-page__label">E-mail</label>
                        <input
                        type="email"
                        className="auth-page__input"
                        placeholder="pochta@yandex.ru"
                        defaultValue=""
                        name="login-mail"
                        required=""
                        minLength={2}
                        maxLength={40}
                        id="login-mail-input"
                        />
                   <span className="form-error login-mail-error"/> 
                   <label className="auth-page__label">Пароль</label>
                        <input
                        type="email"
                        className="auth-page__input"
                        placeholder=""
                        defaultValue=""
                        name="login-password"
                        required=""
                        minLength={2}
                        maxLength={40}
                        id="login-password-input"
                        />
                   <span className="form-error login-password-error"/> 
                </fieldset>
                <Link to='/movies' className="auth-page__form-btn" type="submit">Зарегистрироваться</Link>
                </form>
                <div className="auth-page__btns">
                    <p className="auth-page__p">Уже зарегистрированы?</p>
                    
                    <Link to='/signin' className="auth-page__btn">Войти</Link>
                </div>
        </section>
    </main>
    )
    
}

