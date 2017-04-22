import { homeController } from './controllers/home-controller.js';
import { userController } from './controllers/user-controller.js';

let app = $.sammy('#main-content', function() {

  this.get('#/home', homeController.loadHomePage);

  this.get('#/signup', userController.loadSignUpPage);
  this.get('#/signin', userController.loadSignInPage);

  this.get('#/signout', userController.signOut);

  this.post('#/signup', userController.signUp);
  this.post('#/signin', userController.signIn);

});

app.run('#/home');

userController.onAuthStateChanged(function(user) {
  if (user) {
    $('.signout').removeClass('invisible');
    $('.browse').removeClass('invisible');
    $('#singin').addClass('invisible');
    $('.signup').addClass('invisible');

    console.log('logged');
  } else {
    $('.signout').addClass('invisible');
    $('.browse').addClass('invisible');
    $('#singin').removeClass('invisible');
    $('.signup').removeClass('invisible');

    console.log('not logged');
  }
});
