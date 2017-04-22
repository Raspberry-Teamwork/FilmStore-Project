import { validator } from 'validator';

class UserService {
  constructor() {}

  signUpWithEmailAndPassword(email, password) {
    try {
      validator.validateEmailAndPassword(email, password);
    } catch(error) {
      return Promise.reject({ message: error.message });
    }

    return firebase.auth()
                   .createUserWithEmailAndPassword(email, password)
                   .catch((error) => { console.log(error); });
  }

  onAuthStateChanged(callback) {
    firebase.auth().onAuthStateChanged(callback);
  }

  signOut() {
    firebase.auth()
            .signOut();
  }
}

const userService = new UserService();

export { userService };
