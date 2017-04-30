import {
  requester
} from 'requester';
import {
  genreService
} from 'genres-service';


class GenresController {
  constructor() {}

  loadGenreMovie(sammy) {

    let title = sammy.path.split('/')[3],
      compile;
    requester.get('./views/templates/genres-movie-template.handlebars')
      .then((template) => {
        genreService.getMovieByGenres(title)
          .then((movies) => {
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