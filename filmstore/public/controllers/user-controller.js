import { requester } from 'requester';

import { userService } from 'user-service';

class UserController {
  constructor() {}

  loadSignUpPage() {
    requester.get('./views/signup-page-template.html', 'text/html')
             .then((template) => {
               $('#main-content').html(template);
             });
  }

  loadSignInPage() {
    requester.get('./views/signin-page.html', 'text/html')
             .then((template) => {
               $('#main-content').html(template);
             });
  }

  showAccount(user) {
    // This function will be removed later.

    let span  = $('.account .email');

    span.text(user.email);
  }

  signUp(sammy) {
    let email = $('#inputEmail').val(),
        password = $('#inputPassword').val();

    userService.signUpWithEmailAndPassword(email, password)
               .catch((error) => {
                 toastr.error(error.message);
               })
               .then(() => {
                 sammy.redirect('#/home');
               });
  }

  signIn(sammy) {
    let email = $('#inputEmail').val(),
        password = $('#inputPassword').val();

    userService.signInWithEmailAndPassword(email, password)
               .catch((error) => {
                 toastr.error(error.message);
               })
               .then(() => {
                 sammy.redirect('#/home');
               });

  }

  signOut() {
    userService.signOut();
  }

  onAuthStateChanged(callback) {
    userService.onAuthStateChanged(callback);
  }
}

const userController = new UserController();

export { userController };
