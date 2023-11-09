import { useNavigate } from "react-router-dom";

export function Error() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className="error">
      <div className="error__text">
        <h2 className="error__title">404</h2>
        <p className="error__p">Страница не найдена</p>
      </div>
      <button onClick={handleGoBack} className="error__btn">
        Назад
      </button>
    </section>
  );
}