class MoviesService {
  constructor() {}

  getAllMovies() {
    const promise = new Promise((resolve, reject) => {
      const database = firebase.database().ref('/movies');
      let movies = [];

        database.on('value', function(snapshot) {
          movies = snapshot.val();

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
}

const moviesService = new MoviesService();

export { moviesService };
