import { homeController } from './controllers/home-controller.js';
import { userController } from './controllers/user-controller.js';
import { notFoundController } from './controllers/notFound-controller.js';

let app = $.sammy('#main-content', function() {

  this.get('#/home', homeController.loadHomePage);

  this.get('#/signup', userController.loadSignUpPage);
  this.get('#/signin', userController.loadSignInPage);

  this.get('#/signout', userController.signOut);

  this.post('#/signup', userController.signUp);
  this.post('#/signin', userController.signIn);

  this.notFound = function() {
    notFoundController.loadNotFoundPage();
  };

});

app.run('#/home');

userController.onAuthStateChanged(function(user) {
  if (user) {
    $('.browse').removeClass('invisible');
    $('#singin').addClass('invisible');
    $('.signup').addClass('invisible');
    $('.account').removeClass('invisible');

    userController.showAccount(user);

    console.log('logged');
  } else {
    $('.browse').addClass('invisible');
    $('#singin').removeClass('invisible');
    $('.signup').removeClass('invisible');
    $('.account').addClass('invisible');

    console.log('not logged');
  }
});
