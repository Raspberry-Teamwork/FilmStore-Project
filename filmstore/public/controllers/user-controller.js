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

  loadProfilePage() {
    let compile;

    requester.get('./views/profile-page.html', 'text/html')
             .then((template) => {
               userService.getCurrentUser()
                          .then((user) => {
                            compile = Handlebars.compile(template);

                            $('#main-content').html(compile(user));
                          });
             });
  }

  loadChangeEmailPage() {
    requester.get('./views/change-email-page.html', 'text/html')
             .then((template) => {
               $('#main-content').html(template);
             });
  }

  showAccount(user) {
    let span  = $('.account .email'),
        profileLink = '#/profile/' + user.displayName;

    $('#profile').attr('href', profileLink);

    span.text(user.displayName);
  }

  signUp(sammy) {
    let email = $('#inputEmail').val(),
        password = $('#inputPassword').val(),
        username = $('#inputUsername').val();

    userService.signUpWithEmailAndPassword(email, password, username)
               .catch((error) => {
                 toastr.error(error.message);
               })
              //  .then(() => {
              //    sammy.redirect('#/home');
              //  });
  }

  signIn(sammy) {
    let email = $('#inputEmail').val(),
        password = $('#inputPassword').val();

    userService.signInWithEmailAndPassword(email, password)
               .catch((error) => {

                 toastr.error(error.message);
               });
              //  .then(() => {
              //    sammy.redirect('#/home');
              //  });

  }

  signOut() {
    userService.signOut();
  }

  changeEmail() {
    let newEmail = $('#changeEmail').val(),
        password = $('#password').val();

    userService.changeEmail(newEmail, password)
               .then(function() {
                 toastr.success('The email is changed to : ' + newEmail)
               })
               .catch(function(error) {
                 toastr.error(error.message);
               });
  }

  onAuthStateChanged(callback) {
    userService.onAuthStateChanged(callback);
  }
}

const userController = new UserController();

export { userController };
