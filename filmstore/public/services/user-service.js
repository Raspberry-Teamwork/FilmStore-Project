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

    let authenticate = firebase.auth()
                               .createUserWithEmailAndPassword(email, password)
                               .then(() => this.getCurrentUser())
                               .then((user) => {
                                 user.updateProfile({
                                   displayName: username
                                 });

                                 localStorage.setItem('email', email);
                                 localStorage.setItem('username', username);
                                 localStorage.setItem('userId', user.uid);

                                 this.addUserToTheDatabase(user);
                               })
                               .catch((error) => {
                                 return Promise.reject({ message: errorHandler.handleFirebaseErrors(error) });
                               });

      return authenticate;
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

  signInWithFacebook() {
    let facebookProvider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(facebookProvider)
            .then((result) => {
              console.log(user);
            })
            .catch((error) => {
              console.log(error);
            });
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
        ),
        hanledErrorMessage,
        hanldedError = {};

    let changePassword = currentUser.reauthenticateWithCredential(credentials)
                                   .then(() => {
                                     return currentUser.updatePassword(newPassword)
                                            .catch((error) => {
                                              hanledErrorMessage = errorHandler.handleFirebaseErrors(error);

                                              hanldedError = {
                                                message: hanledErrorMessage
                                              };

                                              return Promise.reject(hanldedError);
                                     });;
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

  addUserToTheDatabase(user) {
    let addUser = new Promise((resolve, reject) => {
        let users = firebase.database().ref('/users'),
            neededDataFromTheUser = {
              uid: user.uid,
              watchlist: [{
                title: 'Sometitle'
              }]
            };

        users.push(neededDataFromTheUser);
    });

    return addUser;
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
