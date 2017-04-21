import { requester } from './../requester/requester.js';

class UserController {
  constructor() {}

  loadSignUpPage() {
    requester.get('./../templates/signup-page-template.html', 'text/html')
             .then((template) => {
               $('#main-content').html(template);
             });
  }
}

const userController = new UserController();

export { userController };
