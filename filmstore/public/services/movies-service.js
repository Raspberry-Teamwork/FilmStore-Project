import { validator } from 'validator';

function convertObjectToArray(obj) {
    let arr = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(obj[key]);
      }
    };

    return arr;
}

const ERROR_MESSAGE = {
  EMPTY_TITLE: "The title of the movie can't be empty.",
  WRONG_TITLE_LENGTH: 'The title of the movie must be between 4 and 40 characters long.',

  EMPTY_PLOT: "The describtion of the movie can't be empty.",
  WRONG_PLOT_LENGTH: "The describtion of the movie must be between 50 and 500 characters long.",

  EMPTY_RUNTIME: "The runtime field can't be empty",
  WRONG_RUNTIME_LENGTH: "The runtime must be between 5 and 10 charactors long.",

  EMPTY_TRAILER_URL: "The trailer url field can't be empty.",
  WRONG_TRAILER_VIDEO_URL: "The trailer url must be from youtube.com",

  EMPTY_ACTORS: "The actors field can't be empty.",
  WRONF_ACTORS_LENGTH: "Tha actors field must be between 5 and 100 character.",

  WRONG_IMG_URL: 'Wrong img url. It must begin with http or https.'
}

class MoviesService {
  constructor() {}

  getAllMovies() {
    const promise = new Promise((resolve, reject) => {
      const database = firebase.database().ref('/movies/');
      let movies = [];

        database.on('value', function(snapshot) {
          movies = snapshot.val();

          if (typeof movies === typeof {}) {
           movies = convertObjectToArray(movies);
          }

          resolve(movies);
        });
    });

    return promise;
  }

  getMovieByTitle(title) {
    const promise = new Promise((resolve, reject) => {
      const database = firebase.database().ref('/movies/');
      let movie,
          movies,
          moviesLength,
          currentMovie;

      database.on('value', function(snapshot) {
        movies = snapshot.val();

        if (typeof movies === typeof {}) {
         movies = convertObjectToArray(movies);
        }

        for (let i = 0; i < movies.length; i += 1) {
          currentMovie = movies[i];

          if (title === currentMovie.Title) {
            movie = currentMovie;

            resolve(movie);
          }
        }
      });

    });

    return promise;
  }

  addMovie(movie) {
    try {
      validator.isEmpty(movie.Actors, ERROR_MESSAGE.EMPTY_ACTORS);
      validator.isBetween(movie.Actors, 5, 100, ERROR_MESSAGE.WRONF_ACTORS_LENGTH);

      validator.isEmpty(movie.Title, ERROR_MESSAGE.EMPTY_TITLE);
      validator.isBetween(movie.Title, 4, 40, ERROR_MESSAGE.WRONG_TITLE_LENGTH);

      validator.isEmpty(movie.Runtime, ERROR_MESSAGE.EMPTY_RUNTIME);
      validator.isBetween(movie.Runtime, 5, 10, ERROR_MESSAGE.WRONG_RUNTIME_LENGTH);

      validator.isEmpty(movie.Plot, ERROR_MESSAGE.EMPTY_PLOT);
      validator.isBetween(movie.Plot, 40, 500, ERROR_MESSAGE.WRONG_PLOT_LENGTH);

      validator.isEmpty(movie.TrailerUrl, ERROR_MESSAGE.EMPTY_TRAILER_URL);
      validator.validateUrl(movie.TrailerUrl, ERROR_MESSAGE.WRONG_TRAILER_VIDEO_URL);

      validator.validateUrl(movie.Poster, ERROR_MESSAGE.WRONG_IMG_URL);
    } catch(error) {
      return Promise.reject({ message: error.message });
    }

    const database = firebase.database().ref('/movies');

    return new Promise((resolve, reject) => {
      database.push(movie);

      resolve();
    });
  }
}

const moviesService = new MoviesService();

export { moviesService };
