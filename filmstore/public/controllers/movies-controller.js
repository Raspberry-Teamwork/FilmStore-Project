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

    requester.get('./views/templates/current-movie-template.handlebars')
             .then((template) => {
               moviesService.getMovieByTitle(title)
                            .then((movie) => {

                              compile = Handlebars.compile(template);

                              $('#main-content').html(compile(movie));
                            });
             });

  }
}

const moviesController = new MoviesController();

export { moviesController };
