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

        console.log('asdasd');

    requester.get('./views/templates/current-movie-template.handlebars')
             .then((template) => {
               moviesService.getMovieByTitle(title)
                            .then((movie) => {

                              compile = Handlebars.compile(template);

                              $('#main-content').html(compile(movie));
                            });
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

  // NOTE: The functionality for adding new movie is not ready yet. I just emplemented the basic functionality.

  addMovie() {
    const title = $('.title').val(),
          year = $('.year').val(),
          description = $('.description').val(),
          runtime = $('.runtime').val(),
          released = $('.released').val(),
          imgUrl = $('.released').val();

    let movie;

   // NOTE: VALIDATION

   movie = {
     Title: title,
     Year: year,
     Plot: description,
     Released: released,
     Poster: imgUrl
   };

   console.log(movie);

  //  moviesService.addMovie(movie)
  //               .then(() => {
  //                 toastr.success('The film is added successfully.');
  //               });
  }
}

const moviesController = new MoviesController();

export { moviesController };
