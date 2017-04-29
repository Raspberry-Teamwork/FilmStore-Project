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

  changePassword(newPassword, currentPassword) {
    try {
      validator.isEmpty(newPassword, "The new password can't be empty.");
      validator.isBetween(newPassword, 5, 25, "The new password must be between 5 and 25 character long.");
    } catch(error) {
      return Promise.reject({ message: error.message });
    }


    let currentUser = firebase.auth().currentUser,
        credentials = firebase.auth.EmailAuthProvider.credential  (
          currentUser.email,
          currentPassword
        );

    let changePassword = currentUser.reauthenticateWithCredential(credentials)
                                   .then(() => {
                                     return currentUser.updatePassword(newPassword);
                                   });

    return changePassword;
  }

  changeProfilePicture(pictureUrl) {
    let currentUser = this.getCurrentUser();

    let changeProfilePicture = currentUser.then((user) => {
                                             user.updateProfile({
                                               photoURL: pictureUrl
                                             });
                                           });

    return changeProfilePicture;
  }

  changeUsername(newUsername) {
    try {
      validator.isEmpty(newUsername, "The username can't be empty.");
      validator.isBetween(newUsername, 5, 25, "The username must be between 5 and 25 characters long.");
    } catch(error) {
      return Promise.reject({ message: error.message });
    }

   let currentUser = this.getCurrentUser();

   let changeUsername = currentUser.then((user) => {
                                       user.updateProfile({
                                         displayName: newUsername
                                       });
                                   });

    return changeUsername;
  }


  getCurrentUser() {
    const user = firebase.auth().currentUser;

    return Promise.resolve(user);
  }

  onAuthStateChanged(callback) {
    firebase.auth().onAuthStateChanged(callback);
  }

  signOut() {
    return firebase.auth()
                   .signOut();
  }
}

const userService = new UserService();

export { userService };
