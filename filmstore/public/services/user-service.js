import { firebase } from 'firebase';

class UserService {
  constructor() {}

  signUp(email, password) {
    firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => { console.log(error); });
  }
}

const userService = new UserService();

export { userService };
