import { homeController } from './controllers/home-controller.js';
import { userController } from './controllers/user-controller.js';


let app = $.sammy('#main-content', function() {

  this.get('#/home', homeController.loadHomePage);

  this.get('#/signup', userController.loadSignUpPage);
  this.get('#/signin', userController.loadSignInPage);

});

app.run('#/home');
