import {
  genreService
} from 'genres-service';

function convertObjectToArray(obj) {
    let arr = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(obj[key]);
      }
    }

    return arr;
}

class Searcher {
  constructor() {}

  search(genre, title) {
    let promise = new Promise((resolve, reject) => {
          let foundMovies = [];
          if (genre !==null && !title) {
            genreService.getMovieByGenres(genre)
                  .then((movies) => {

              foundMovies=movies;
                  if (foundMovies.length === 0) {
                    return reject({ message: 'The movie is not found.' });
                  }
                  console.log(foundMovies);
            resolve(foundMovies);

         });
          }else{
          console.log(`Other Search`);

            let moviesRef = firebase.database().ref('/movies'),
              movies = [];

             moviesRef.once('value')
              .then((moviesSnapshot) => {
                movies = moviesSnapshot.val();

                if(typeof movies === typeof {}) {
                  movies = convertObjectToArray(movies);
                }

                movies.forEach(movie => {
                     if ((title===null || title==='') && (movie.Title === title && (movie.Genre.indexOf(genre) !== -1))) {
                      foundMovies.push(movie);
                     }else
                     {
                       if((movie.Genre.indexOf(genre) !== -1)){
                      foundMovies.push(movie);
                       }
                     }

                  });

                  if (foundMovies.length === 0) {
                    return reject({ message: 'The movie is not found.' });
                  }

                  resolve(foundMovies);
                });

          }


              });

    return promise;
  }
}

const searcherService = new Searcher();

export { searcherService };
