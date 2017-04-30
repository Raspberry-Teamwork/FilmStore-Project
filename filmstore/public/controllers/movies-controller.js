import { requester } from 'requester';

import { moviesService } from 'movies-service';

class MoviesController {
  constructor() {}

  loadThePageWithTheAllMovies() {
    let compile;

    requester.get('./views/templates/all-movies-template.handlebars')
             .then((template) => {
               moviesService.getAllMovies()
                            .then((movies) => {
                              compile = Handlebars.compile(template);

                              $('#main-content').html(compile(movies));
                            });
             });
  }

  loadCurrentMovie(sammy) {

    let title = sammy.path.split('/')[3],
        compile;

    console.log(title);

    requester.get('./views/templates/current-movie-template.handlebars')
             .then((template) => {
               moviesService.getMovieByTitle(title)
                            .then((movie) => {
                              compile = Handlebars.compile(template);

                              $('#main-content').html(compile(movie));
                            })
                            .catch(console.log);
             });
  }

  loadAddMoviePage() {
    requester.get('./views/add-movie-page.html', 'text/html')
             .then((template) => {
                $('#main-content').html(template);
             });
  }

  loadAddMovieFromIMDBPage() {
    requester.get('./views/add-movie-from-IMDB.html')
             .then((template) => {
               $('#main-content').html(template);
             });
  }

  addMovie() {
    const title = $('.title').val(),
          year = $('.year').val(),
          description = $('.description').val(),
          runtime = $('.runtime').val(),
          released = $('.released').val(),
          imgUrl = $('.img-url').val(),
          actors = $('.actors').val(),
          genres = $('.genres').val(),
          trailerUrl = $('.trailer-url').val();

    let movie;

   movie = {
     Actors: actors,
     Title: title,
     Year: year,
     Genres: genres,
     Plot: description,
     Released: released,
     Poster: imgUrl,
     Runtime: runtime,
     TrailerUrl: trailerUrl
   };

   moviesService.addMovie(movie)
                .catch((error) => {
                  toastr.error(error.message);
                });
  }

  addMovieFromIMDB() {
    let movieURL = 'http://img.omdbapi.com/?i=' + $('.imdbId').val() + '&apikey=f18a1ff5';

    requester.getFromOMDB(movieURL)
            .then(movie => {
              console.log(movie);
              // NOTE: Don't uncomement the row below because it isn't working.
              // The creator of the OMDB is still not add our email.

              //  moviesService.addMovie(movie);
            });
  }
}

const moviesController = new MoviesController();

export { moviesController };
