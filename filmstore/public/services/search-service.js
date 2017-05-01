function convertObjectToArray(obj) {
    let arr = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(obj[key]);
      }
    };

    return arr;
}

class Searcher {
  constructor() {}

  search(genre, title) {
    let promise = new Promise((resolve, reject) => {
      let moviesRef = firebase.database().ref('/movies'),
          foundMovies = [],
          movies = [];

   moviesRef.once('value')
            .then((moviesSnapshot) => {
              movies = moviesSnapshot.val();

              if(typeof movies === typeof {}) {
                movies = convertObjectToArray(movies);
              }

              movies.forEach(movie => {
                if (movie.Title === title && movie.Genre.indexOf(genre) !== -1) {
                    foundMovies.push(movie);
                }
              });

              if (foundMovies.length === 0) {
                return reject({ message: 'The movie is not found.' });
              }

              resolve(foundMovies);
            });
    });

    return promise;
  }
}

const searcherService = new Searcher();

export { searcherService };
