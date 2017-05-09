import {
  requester
} from 'requester';
import {
  genreService
} from 'genres-service';


class GenresController {
  constructor() {}

  loadGenreMovie(sammy) {

    let genre = sammy.path.split('/')[3],
        genreToGet=[genre],
        compile;
    requester.get('./views/templates/genres-movie-template.handlebars')
      .then((template) => {
        genreService.getMovieByGenres(genreToGet)
          .then((movies) => {
            loadingScreen.finish();

            compile = Handlebars.compile(template);
            $('#main-content').html(compile(movies));
          })
          .catch(console.log);
      });
  }
}

const genresController = new GenresController();
export {
  genresController
};
