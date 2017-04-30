import { requester } from 'requester';
import { userService } from 'user-service';

class UserController {
  constructor() {}

  loadSignUpPage() {
    let signInPagePath = './views/signup-page-template.html';

    requester.get(signInPagePath, 'text/html')
             .then((template) => {
               loadingScreen.finish();

               $('#main-content').html(template);
             });
  }

  loadSignInPage() {
    let signUpPagePath = './views/signin-page.html';

    requester.get(signUpPagePath, 'text/html')
             .then((template) => {
               loadingScreen.finish();

               $('#main-content').html(template);
             });
  }

  loadProfilePage() {
    let compile,
        profilePagePath = './views/profile-page.html';

    requester.get(profilePagePath, 'text/html')
             .then((template) => {
               userService.getCurrentUser()
                          .then((user) => {
                            loadingScreen.finish();

                            compile = Handlebars.compile(template);

                            $('#main-content').html(compile(user));
                          });
             });
  }

  loadChangeEmailPage() {
    let changeEmailPagePath = './views/change-profile-views/change-email-page.html';

    requester.get(changeEmailPagePath, 'text/html')
             .then((template) => {
               loadingScreen.finish();

               $('#main-content').html(template);
             });
  }

  loadChangeProfilePicturePage() {
    let changeProfilePicturePath = './views/change-profile-views/change-profile-picture-page.html';

    requester.get(changeProfilePicturePath, 'text/html')
            .then((template) => {
              loadingScreen.finish();

              $('#main-content').html(template);
            });
  }

  loadChangeUsernamePage() {
    let changeUsernamePagePath = './views/change-profile-views/change-username-page.html';

    requester.get(changeUsernamePagePath, 'text/html')
             .then((template) => {
               loadingScreen.finish();

               $('#main-content').html(template);
             });
  }

  loadChangePasswordPage() {
    let changePasswordPagePath = './views/change-profile-views/change-password-page.html';

    requester.get(changePasswordPagePath, 'text/html')
             .then((template) => {
               loadingScreen.finish();
               
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

  signInWithFacebook() {
   userService.signInWithFacebook();
  }

  signOut(sammy) {
    userService.signOut()
               .then(() => {
                 sammy.redirect('#/home');
               });
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

  changeProfilePicture() {
    let pictureUrl = $('#changeProfilePicture').val();

    userService.changeProfilePicture(pictureUrl)
               .then(() => {
                 toastr.success('The profile picture is successfully changed.');
               })
               .catch((error) => {
                toastr.error(error.message);
               });

  }

  changeUsername() {
    let newUsername = $('#changeUsername').val();

    userService.changeUsername(newUsername)
               .then(() => {
                  toastr.success('Your username is successfully changed.');
               })
               .catch((error) => {
                 toastr.error(error.message);
               });
  }

  changePassword() {
    let newPassword = $('#changePassword').val(),
        currentPassword = $('#currentPassword').val();

    userService.changePassword(newPassword, currentPassword)
               .then(() => {
                 toastr.success('The password is changed successfully.');
               })
               .catch((error) => {
                 toastr.error(error.message);
               });
  }

  onAuthStateChanged(callback) {
    userService.onAuthStateChanged(callback);
  }
}

const userController = new UserController();

export { userController };
