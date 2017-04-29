import { validator } from 'validator';
import { errorHandler } from 'error-handler';

class UserService {
  constructor() {}

  signUpWithEmailAndPassword(email, password, username) {
    try {
      validator.validateEmailAndPassword(email, password);
    } catch(error) {
      return Promise.reject({ message: error.message });
    }

    return firebase.auth()
                   .createUserWithEmailAndPassword(email, password)
                   .then(() => {
                     firebase.auth().currentUser.updateProfile({
                       displayName: username
                     });
                   })
                   .catch((error) => {
                     return Promise.reject({ message: errorHandler.handleFirebaseErrors(error) });
                   });
  }

  signInWithEmailAndPassword(email, password) {
    try {
      validator.validateEmailAndPassword(email, password);
    } catch(error) {
      return Promise.reject({ message: error.message });
    }

    return firebase.auth()
                   .signInWithEmailAndPassword(email, password);
  }

  changeEmail(newEmail, password) {
    let currentUser = firebase.auth().currentUser,
        credential = firebase.auth.EmailAuthProvider.credential(
          currentUser.email,
          password
        ),
        hanledErrorMessage,
        hanldedError = {};

    let changeEmail = currentUser.reauthenticateWithCredential(credential)
                      .then(() => {
                        return currentUser.updateEmail(newEmail)
                          .catch((error) => {
                            hanledErrorMessage = errorHandler.handleFirebaseErrors(error);

                            hanldedError = {
                              message: hanledErrorMessage
                            };

                            return Promise.reject(hanldedError);
                          });
                      });

    return changeEmail;
  }

  changeProfilePicture(pictureUrl) {
    let currentUser = firebase.auth().currentUser;

    let changeProfilePicture = currentUser.updateProfile({
      photoURL: pictureUrl
    });

    return changeProfilePicture;
  }

  getCurrentUser() {
    const user = firebase.auth().currentUser;

    return Promise.resolve(user);
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
