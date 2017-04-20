import { homeController } from './controllers/home-controller.js';


let app = $.sammy('#main-content', function() {
  this.get('#/home', homeController.loadHomePage);
});

app.run('#/home');
