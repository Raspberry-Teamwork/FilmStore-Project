import { requester } from 'requester';

import { moviesService } from 'movies-service';

import { genreService } from 'genres-service';

class MoviesController {
  constructor() {}

  loadThePageWithTheAllMovies() {
    let compile;

    requester.get('./views/templates/all-movies-template.handlebars')
             .then((template) => {
               moviesService.getAllMovies()
                            .then((movies) => {
                              loadingScreen.finish();

                              compile = Handlebars.compile(template);
                              $('#main-content').html(compile(movies));
                            });
             });
  }

  loadCurrentMovie(sammy) {

    let title = sammy.path.split('/')[3],
        currentMovieTemplateFilePath = './views/templates/current-movie-template.handlebars',
        compile;

    requester.get(currentMovieTemplateFilePath)
             .then((template) => {
               moviesService.getMovieByTitle(title)
                            .then((movie) => {
                              loadingScreen.finish();

                              compile = Handlebars.compile(template);
                              $('#main-content').html(compile(movie));
                            })
                            .catch(console.log);
             });
  }

  loadAddMoviePage() {
    let addMoviePagePath = './views/add-movie-page.html';

    requester.get(addMoviePagePath, 'text/html')
             .then((template) => {
               loadingScreen.finish();

                $('#main-content').html(template);
                 Vue.component('v-select', VueSelect.VueSelect);
                   genreService.getAllGenres()
                            .then((genres) => {
                                    new Vue({
                                        data:{
                                          selected:null,
                                            options: genres.genres,
                                            return:{

                                            }
                                        }, placeholder: {
                                            type: String,
                                            default: ''
                                          },
                                        el: '#genre-multiselector'
                                    });
                            });
             });
  }

  loadAddMovieFromIMDBPage() {
    let addMovieFromIMDBPagePath = './views/add-movie-from-IMDB.html';

    requester.get(addMovieFromIMDBPagePath)
             .then((template) => {
               loadingScreen.finish();

               $('#main-content').html(template);
             });
  }

  loadTopMoviesPage() {
    let topMoviesTemplatePath = './views/templates/top-movies-template.handlebars',
        compile;

    requester.get(topMoviesTemplatePath)
             .then((template) => {

               moviesService.getTopMovies()
                            .then((movies) => {
                              loadingScreen.finish();

                              compile = Handlebars.compile(template);

                              $('#main-content').html(compile(movies));
                            });
             });
  }

  addMovie() {




    const title = $('.title').val(),
          year = $('.year').val(),
          description = $('.description').val(),
          runtime = $('.runtime').val(),
          released = $('.released').val(),
          imgUrl = $('.img-url').val();
          genre = $('#selected-genres').text().split(',');

    let movie = {
      Actors: actors,
      Title: title,
      Year: year,
      //  Genres: genres, Commented out because is dublicated by the last one
      Plot: description,
      Released: released,
      Poster: imgUrl,
      Runtime: runtime,
      Genre: genre,
      TrailerUrl: trailerUrl
    };

   moviesService.addMovie(movie)
                .then(() => {

                  toastr.success('The movie is successfully added.');
                })
                .catch((error) => {
                  toastr.error(error.message);
                });
  }

  addMovieFromIMDB() {
    let movieId = $('.imdbId').val();

    if (movieId.length === 0) {
      toastr.error('The imdb id can not be empty.');
      return;
    }

    let movieURL = 'http://www.omdbapi.com/?i=' + movieId,
        trailerUrl = $('.trailer-url').val();

    requester.getFromOMDB(movieURL)
             .then(movie => {
               movie.TrailerUrl = trailerUrl;

               moviesService.addMovieFromIMDB(movie)
                            .then(() => {
                              toastr.success('The movie is successfully added.');
                            })
                            .catch((error) => {
                              toastr.error(error.message);
                            });;
            });
  }
}

const moviesController = new MoviesController();

export { moviesController };
