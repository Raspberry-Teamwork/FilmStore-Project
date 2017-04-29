import { requester } from 'requester';

class HomeController {
  constructor() {}

  loadHomePage() {
    requester.get('./views/home-page-template.html', 'text/html')
             .then((template) => {
               $('#main-content').html(template);
             });

    console.log(firebase.auth().currentUser);
  }
}

const homeController = new HomeController();

export { homeController };
