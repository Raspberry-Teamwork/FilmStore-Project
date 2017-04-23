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
}

const moviesService = new MoviesService();

export { moviesService };
