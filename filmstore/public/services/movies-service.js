import { validator } from 'validator';

function convertObjectToArray(obj) {
    let arr = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(obj[key]);
      }
    };

    console.log(arr);

    return arr;
}

const ERROR_MESSAGE = {
  EMPTY_TITLE: "The title of the movie can't be empty.",
  WRONG_TITLE_LENGTH: 'The title of the movie must be between 4 and 40 characters long.',

  EMPTY_PLOT: "The describtion of the movie can't be empty.",
  WRONG_PLOT_LENGTH: "The describtion of the movie must be between 50 and 500 characters long.",

  EMPTY_RUNTIME: "The runtime field can't be empty",
  WRONG_RUNTIME_LENGTH: "The runtime must be between 5 and 10 charactors long.",

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
          moviesLength;

      database.on('value', function(movies) {
        moviesLength = movies.val().length;

        if (typeof movies === typeof {}) {
         moviesLength = convertObjectToArray(movies).length;
        }

        for (let i = 0; i < moviesLength; i += 1) {
          let currentMovie = movies.val()[i];

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
      validator.isEmpty(movie.Title, ERROR_MESSAGE.EMPTY_TITLE);
      validator.isBetween(movie.Title, 4, 40, ERROR_MESSAGE.WRONG_TITLE_LENGTH);

      validator.isEmpty(movie.Runtime, ERROR_MESSAGE.EMPTY_RUNTIME);
      validator.isBetween(movie.Runtime, 5, 10, ERROR_MESSAGE.WRONG_RUNTIME_LENGTH);

      validator.isEmpty(movie.Plot, ERROR_MESSAGE.EMPTY_PLOT);
      validator.isBetween(movie.Plot, 40, 500, ERROR_MESSAGE.WRONG_PLOT_LENGTH);

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
