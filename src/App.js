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
import Preloader from "./components/preloader/Preloader";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(true);
  const [movies, setMovies] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (localStorage.token) {
      Promise.all([
        apiMain.getProfile(localStorage.token),
        apiMovies.getMovies(localStorage.token),
        setIsTokenChecked(false),
        setIsLogged(true),
      ])
        .then(([dataUser, dataMovies]) => {
          setCurrentUser(dataUser);
          setMovies(dataMovies);
         // setSavedMovies(dataMovies)
          setIsLogged(true);
        })
        .catch((err) => {
          console.error(`Ошибка при загрузке данных ${err}`);
          localStorage.clear();
          setIsTokenChecked(false);
        });
    } else {
      setIsLogged(false);
      setIsTokenChecked(false)
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
    navigateTo("/");
  }

  function handleDeleteMovie(movieId) {
    apiMain
      .deleteMovie(movieId, localStorage.token)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => movie.data._id !== movieId));
      })
      .catch((err) => console.error(`Ошибка: не удалось удалить фильм ${err}`));
  }

  function toggleMovie(data) {
    const isSaved = savedMovies.some(item => data.id === item.data.movieId);
    console.log(savedMovies)
    if (isSaved) {
      console.log('deleting');
      const savedArray = savedMovies.filter((movie) => {
        return movie.data.movieId === data.id
      })
      const movieToDelete = savedArray[0].data;
      handleDeleteMovie(movieToDelete._id);
    } else {
      if (!isSaved) {
        apiMain
          .saveMovie(data, localStorage.token)
          .then(res => {
            setSavedMovies([res, ...savedMovies]);
          })
          .catch(err => console.error(`Ошибка сохранения фильма ${err}`));
      }
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      {isTokenChecked ? <Preloader /> :
        <Routes>
          <Route path="/" element={<Main isLogged={isLogged} />} />
          <Route
            path="/movies"
            element={
              <Movies
                saveMovie={toggleMovie}
                isLogged={isLogged}
                deleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile onUpdateUser={handleUpdateUser} logOut={handleLogOut}  isLogged={isLogged}/>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                savedMovies={savedMovies}
                deleteMovie={handleDeleteMovie}
                isLogged={isLogged}
                setSavedMovies={setSavedMovies}
              />
            }
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} 
            />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
