import { requester } from 'requester';

class HomeController {
  constructor() {}

  loadHomePage() {
    let homePagePath = './views/home-page-template.html';

    requester.get(homePagePath, 'text/html')
             .then((template) => {
               loadingScreen.finish();

               $('#main-content').html(template);
             });
  }
}

const homeController = new HomeController();

export { homeController };
