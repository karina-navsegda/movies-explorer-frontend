
import { useState } from "react";
import Header from "../header/Header";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <Header />
      <main className="main">
        <section className="profile">
          <form className="profile__form" name="edit__form" method="post">
            <h2 className="profile__title">Привет, Карина!</h2>
            <fieldset className="profile__fieldset">
              <label className="profile__form-label">
                <span className="profile__input-heading">Имя</span>
                <input
                  type="text"
                  className="profile__input profile__input_type_name"
                  placeholder="Карина"
                  defaultValue=""
                  name="edit-name"
                  required=""
                  minLength={2}
                  maxLength={40}
                  id="name"
                  disabled={!isEditing}
                />
              </label>
              <span className="form-error name-error" />
              <label className="profile__form-label">
                <span className="profile__input-heading">Email</span>
                <input
                  type="email"
                  className="profile__input profile__input_type_email"
                  placeholder="pochta@yandex.ru"
                  defaultValue=""
                  name="edit-email"
                  required=""
                  minLength={2}
                  maxLength={40}
                  id="email"
                  disabled={!isEditing}
                />
              </label>
              <span className="form-error email-error" />
            </fieldset>
            <div className="profile__btns">
              <button className="profile__edit-btn" onClick={handleEditClick}>
                {isEditing ? "Сохранить" : "Редактировать"}
              </button>
              <button className="profile__edit-btn profile__edit-btn_red">
                Выйти из аккаунта
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;

