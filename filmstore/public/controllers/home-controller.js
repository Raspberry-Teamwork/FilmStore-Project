import { requester } from 'requester';

class HomeController {
  constructor() {}

  loadHomePage() {
    requester.get('./views/home-page-template.html', 'text/html')
             .then((template) => {
               $('#main-content').html(template);
             });
  }
}

const homeController = new HomeController();

export { homeController };
