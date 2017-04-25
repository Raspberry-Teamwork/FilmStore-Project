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
                              console.log('asdasd');
                              compile = Handlebars.compile(template);

                              $('#main-content').html(compile(movie));
                            })
                            .catch(console.log);
             });

    console.log('asdasd');

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
          imgUrl = $('.img-url').val();

    let movie;

   movie = {
     Title: title,
     Year: year,
     Plot: description,
     Released: released,
     Poster: imgUrl,
     Runtime: runtime
   };

   moviesService.addMovie(movie)
                .catch((error) => {
                  toastr.error(error.message);
                });
  }
}

const moviesController = new MoviesController();

export { moviesController };
