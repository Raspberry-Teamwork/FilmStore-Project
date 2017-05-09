import { requester } from 'requester';
import { searcherService } from '/../services/search-service.js';
import { genreService } from 'genres-service';

class Search {
  constructor() {}

  loadSearchPage() {
     let loadSearchPath = './views/templates/search-movie-template.handlebars',
        compile;
             console.log("loading template");

    requester.get(loadSearchPath)
             .then((template) => {
               loadingScreen.finish();
                 compile = Handlebars.compile(template);
                $('#main-content').html(compile);
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

  search() {
    let genre = $('#searched-genres').text().replace(']','').replace('[','').trim().split(','),
        title = $('#title').val(),
        movieTemplatePath = './views/templates/all-movies-template.handlebars',
        compile;
     searcherService.search(genre, title)
                   .then((movies) => {
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
