import { requester } from 'requester';

import { userService } from 'userService';

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

  signUp() {

  }
}

const userController = new UserController();

export { userController };
