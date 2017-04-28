import { requester } from 'requester';

class Search {
  constructor() {}

  loadSearchPage() {
    requester.get('./views/search-page.html', 'text/html')
             .then((template) => {
               $('#main-content').html(template);
             });
  }
}

const searchController = new Search();

export { searchController };
