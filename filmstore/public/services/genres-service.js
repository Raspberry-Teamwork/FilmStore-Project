import {
    convertObjectToArray
} from 'movies-service';
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
class GenreService {

    constructor() {}

    getMovieByGenres(genres) {
        const promise = new Promise((resolve, reject) => {
             console.log(` Genre service ${genres} type ${typeof genres}`);
            const database = firebase.database().ref('/movies/');
            let movie,
                movies,
                moviesWithGenres=[],
                currentMovie,
                genLen = genres.length;

            database.on('value', function (snapshot) {
                let movieProp=(snapshot.val()[0].Genre.split(','));
                movies = snapshot.val();

                for (let i = 0, len = movies.length; i < len; i += 1) {
                    currentMovie = movies[i];
                    let currentMovieGenres=currentMovie.Genre.split(',');
                    currentMovieGenres.forEach(function(element) {

                        for (let i of genres) {
                            var currentGenre = i.trim();

                            console.log(`/${currentGenre.replace('"','').replace('"','').toLowerCase()}/ and #${element.toLowerCase()}`);
                            console.log(`/${currentGenre.toLowerCase() === element.toLowerCase()}`);


                             if (currentGenre.replace('"','').replace('"','').toLowerCase()===element.toLowerCase()) {
                                 console.log("HITTTT");
                                 moviesWithGenres.push(currentMovie);
                                }
                        }
                    }, this);
                }
                resolve(moviesWithGenres);
            });
        });
        return promise;
    }
    getAllGenres() {
    const promise = new Promise((resolve, reject) => {
      const database = firebase.database().ref('/genres/');
      let genres = [];
        database.on('value', function(snapshot) {
          genres = snapshot.val();
          let genreskeys=Object.keys(genres);

            for (var i = 0,len=genreskeys.length; i < len; i+=1) {
                genreskeys[i]=toTitleCase(genreskeys[i]);
            }

          let myobject={};
          myobject.genres=genreskeys;
          resolve(myobject);
        });
    });

    return promise;
  }
}
const genreService = new GenreService();

export {
    genreService
};