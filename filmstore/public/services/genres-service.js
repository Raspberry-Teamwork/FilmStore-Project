import {
    convertObjectToArray
} from 'movies-service';
class GenreService {

    constructor() {}

    getMovieByGenres(genres) {
        const promise = new Promise((resolve, reject) => {
            const database = firebase.database().ref('/movies/');
            let movie,
                movies,
                moviesLength,
                moviesWithGenres,
                currentMovie,
                genLen = genres.length;
                if(typeof(genres)!==Array){
                    let old=genres;
                    genres=[];
                    genres.push(old);
                    console.log(genres);
                }

            database.on('value', function (snapshot) {
                movies = snapshot.val();

                if (typeof movies === typeof {}) {
                    movies = convertObjectToArray(movies);
                }

                for (let i = 0, len = movies.length; i < len; i += 1) {
                    currentMovie = movies[i];
                    let currentMovieGenres=currentMovie.Genre.toLowerCase().spit(',');
                        console.log(`HERE -->${currentMovieGenres}`);
                    // console.log(currentMovie.Genre);
                    if (genLen === 1) {

                         if (currentMovie.genre===genre) {
                                 moviesWithGenres.push(currentMovie);
                                }else{
                                    console.log('In but not true');
                                }

                    } else {
                        genres.forEach((genre)=>{
                                //  console.log(`Current movie-${currentMovie} and genre: ${genre}`);

                             if (currentMovie.genre===genre) {
                                 moviesWithGenres.push(currentMovie);
                    }}, this);
                    }
                }
                resolve(moviesWithGenres);
            });
        });
        return promise;
    }
}
const genreService = new GenreService();

export {
    genreService
};