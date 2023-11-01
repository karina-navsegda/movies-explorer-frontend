class ApiMain {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       email, password
      }),
    }).then(this._checkResponse);
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       name, email, password
      }),
    }).then(this._checkResponse);
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  getProfile(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  getMovies(token) {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  setProfile(name, email, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name, email
      }),
    }).then(this._checkResponse);
  }


  saveMovie(data, token) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        description: data.description,
        year: data.year,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    }).then(this._checkResponse);
  }


  deleteMovie(movieId, token) {
    return fetch(`${this._url}/cards/${movieId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

const apiMain = new ApiMain({
  baseUrl: "api.diplomaslaay.nomoredomainsrocks.ru",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiMain;
