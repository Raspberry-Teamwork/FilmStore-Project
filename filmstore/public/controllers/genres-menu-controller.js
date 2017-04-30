import { requester } from 'requester';
import { genreService } from 'genres-service';

class menuGenerator{

loadMenuWithTheAllGenres() {
    let compile;

    requester.get('./views/templates/genres-menu.handlebars')
             .then((template) => {
               genreService.getAllGenres()
                            .then((genres) => {
                                console.log(genres);
                              compile = Handlebars.compile(template);
                              $('#genres-menu').html(compile(genres));
                            });
             });
  }
}
const menugenerator=new menuGenerator();
export{menugenerator};
