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
      const database = firebase.database().ref('/movies');
      let movie,
          moviesLength;

      database.on('value', function(movies) {
        moviesLength = movies.val().length;

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
    const database = firebase.database().ref('/movies');

    return new Promise((resolve, reject) => {
      database.push(movie);

      resolve();
    });
  }
}

const moviesService = new MoviesService();

export { moviesService };
