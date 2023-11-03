import { useState, useEffect, useContext } from "react";
import Header from "../header/Header";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ onUpdateUser, logOut }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      email,
    });
  }

  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <Header />
      <main className="main">
        <section className="profile">
          <form className="profile__form" name="edit__form" method="post" onSubmit={handleSubmit}>
            <h2 className="profile__title">Привет, Карина!</h2>
            <fieldset className="profile__fieldset">
              <label className="profile__form-label">
                <span className="profile__input-heading">Имя</span>
                <input
                  type="name"
                  className="profile__input profile__input_type_name"
                  placeholder="Карина"
                  name="edit-name"
                  required=""
                  minLength={2}
                  maxLength={40}
                  id="name"
                  disabled={!isEditing}
                  onChange={handleNameChange}
                  value={name || ''} 
                />
              </label>
              <span className="form-error name-error" />
              <label className="profile__form-label">
                <span className="profile__input-heading">Email</span>
                <input
                  type="email"
                  className="profile__input profile__input_type_email"
                  placeholder="pochta@yandex.ru"
                  name="edit-email"
                  required=""
                  minLength={2}
                  maxLength={40}
                  id="email"
                  disabled={!isEditing}
                  onChange={handleEmailChange}
                  value={email || ''} 
                />
              </label>
              <span className="form-error email-error" />
            </fieldset>
            <div className="profile__btns">
              <button
                className={`profile__edit-btn ${
                  isEditing ? "profile__edit-btn_save" : ""
                }`}
                onClick={handleEditClick}
              >
                {isEditing ? "Сохранить" : "Редактировать"}
              </button>

              {isEditing ? null : (
                <button className="profile__edit-btn profile__edit-btn_red" type="submit" onClick={logOut}>
                  Выйти из аккаунта
                </button>
              )}
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;
