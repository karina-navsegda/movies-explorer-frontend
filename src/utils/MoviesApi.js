class ApiMovies {
    constructor(options) {
      this._url = options.baseUrl;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    }
  
    getMovies() {
      return fetch(`${this._url}/`)
        .then(this._checkResponse);
    }
  }
  
  const apiMovies = new ApiMovies({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  });

export default apiMovies;
  