import { requester } from '../requester/requester.js';

class HomeController {
  constructor() {}

  loadHomePage() {
    requester.get('./templates/home-page-template.html', 'text/html')
             .then((template) => {
               $('#main-content').html(template);
             });
  }
}

const homeController = new HomeController();

export { homeController };
