import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login/Login";
import Main from "./components/main/Main";
import Movies from "./components/movies/Movies";
import Profile from "./components/profile/Profile";
import { Register } from "./components/register/Register";
import SavedMovies from "./components/savedMovies/SavedMovies";
import { Error } from "./components/error/Error";

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </div>
  );
}

export default App;
