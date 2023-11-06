import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./components/login/Login";
import Main from "./components/main/Main";
import Movies from "./components/movies/Movies";
import Profile from "./components/profile/Profile";
import { Register } from "./components/register/Register";
import SavedMovies from "./components/savedMovies/SavedMovies";
import { Error } from "./components/error/Error";
import apiMain from "./utils/MainApi";
import apiMovies from "./utils/MoviesApi";
import CurrentUserContext from "./contexts/CurrentUserContext";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (localStorage.token) {
      Promise.all([
        apiMain.getProfile(localStorage.token),
        apiMovies.getMovies(localStorage.token),
        setIsLogged(true),
      ])
        .then(([userData, dataMovies]) => {
          setCurrentUser(userData);
          setSavedMovies(dataMovies);
          console.log(dataMovies);
          console.log(savedMovies);
          console.log(userData);
          setIsLogged(true);
        })
        .catch((err) => {
          console.error(`Ошибка при загрузке начальных данных ${err}`);
          localStorage.clear();
        });
    } else {
      setIsLogged(false);
      localStorage.clear();
    }
  }, [isLogged]);

  function handleLogin({ email, password }) {
    console.log(email, password);
    apiMain
      .login(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setIsLogged(true);
        console.log(res.token);
        navigateTo("/movies");
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleRegister({ name, email, password }) {
    console.log(name, email, password);
    apiMain
      .register(name, email, password)
      .then((res) => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.error(`Ошибка при регистрации ${err}`);
      });
  }

  function handleUpdateUser({ name, email }) {
    apiMain
      .setProfile(name, email, localStorage.token)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        console.error(`Ошибка updateuser: ${error}`);
      });
  }

  function handleLogOut() {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigateTo("/signin");
  }

  function handleDeleteMovie(movieId) {
    apiMain
      .deleteMovie(movieId, localStorage.token)
      .then(() => {
        setSavedMovies(
          savedMovies.filter((movie) => {
            return movie._id !== movieId;
          })
        );
      })
      .catch((err) => console.error(`Ошибка: не удалось удалить фильм ${err}`));
  }

  function toggleMovie(data) {
    const isSaved = savedMovies.some((element) => data.id === element.movieId);
    const foundMovies = savedMovies.filter((movie) => {
      return movie.movieId === data.id;
    });
    if (isSaved) {
      handleDeleteMovie(foundMovies[0]._id);
    } else {
      console.log(data, localStorage.token);
      apiMain
        .saveMovie(data, localStorage.token)
        .then((res) => {
          setSavedMovies([res, ...savedMovies]);
        })
        .catch((err) => console.error(`Ошибка сохранения фильма ${err}`));
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main isLogged={isLogged} />} />
          <Route
            path="/movies"
            element={
              <Movies
                savedMovies={savedMovies}
                saveMovie={toggleMovie}
                isLogged={isLogged}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLogged={isLogged}>
                <Profile
                  onUpdateUser={handleUpdateUser}
                  logOut={handleLogOut}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLogged={isLogged}>
                <SavedMovies
                  savedMovies={savedMovies}
                  deleteMovie={handleDeleteMovie}
                  isLogged={isLogged}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
