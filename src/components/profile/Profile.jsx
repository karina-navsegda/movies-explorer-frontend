import { useState, useEffect, useContext } from "react";
import Header from "../header/Header";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ onUpdateUser, logOut, isLogged }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanged] = useState(true);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleNameChange(e) {
    const newValue = e.target.value;
    if (newValue !== name) {
        setName(newValue);
        setHasChanged(true);
    }
}

function handleEmailChange(e) {
    const newValue = e.target.value;
    if (newValue !== email) {
        setEmail(newValue);
        setHasChanged(true);
    }
}

  function handleSubmit(e) {
    e.preventDefault();
    if (hasChanges) {
      onUpdateUser({
        name,
        email,
      });
      setHasChanged(false); 
     setIsEditing(false)
    }
  }

  const handleEditClick = () => {
    console.log("Edit button clicked");
    setIsEditing(true);
    console.log(isEditing)
    setHasChanged(false)
  };

  return (
    <>
      <Header  isLogged={isLogged}/>
      <main className="main">
        <section className="profile">
          <form className="profile__form" name="edit__form" method="post">
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
    type="submit"
    className={`profile__edit-btn ${isEditing ? "profile__edit-btn_save"  : ""}`}
    disabled={isEditing ? !hasChanges : ""}
    onClick={isEditing ? handleSubmit : handleEditClick}
>
    {isEditing ? "Сохранить" : "Редактировать"}
</button>

              {isEditing ? null : (
                <button className="profile__edit-btn profile__edit-btn_red" onClick={logOut}>
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
