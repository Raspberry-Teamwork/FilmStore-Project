import { requester } from 'requester';
import { searcherService } from '/../services/search-service.js';

class Search {
  constructor() {}

  loadSearchPage() {
    requester.get('./views/search-page.html', 'text/html')
             .then((template) => {
               loadingScreen.finish();

               $('#main-content').html(template);
             });
  }

  search() {
    let genre = $('#genre option:selected').text(),
        title = $('#title').val(),
        compile;

    searcherService.search(genre, title)
                   .then((movies) => {
                     let movieTemplatePath = './views/templates/all-movies-template.handlebars';

                     requester.get(movieTemplatePath)
                              .then((template) => {
                                compile = Handlebars.compile(template);

                                $('#found-movies').html(compile(movies));
                              });
                   })
                   .catch((error) => {
                     toastr.error(error.message);
                   });
  }
}

const searchController = new Search();

export { searchController };
