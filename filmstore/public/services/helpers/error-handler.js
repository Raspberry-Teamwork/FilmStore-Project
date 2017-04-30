let errorHandler = (function() {
  const FIREBASE_ERROR_CODES = {
    EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
    INVALID_EMAIL: 'auth/invalid-email',
    REAUTHENTICATE: 'auth/requires-recent-login',
    WRONG_PASSWORD: 'auth/wrong-password'

  };

  const ERROR_MESSAGES = {
    EMAIL_ALREADY_IN_USE: 'Email already in use please try again.',
    INVALID_EMAIL: 'Entered email is invalid please try again.',
    REAUTHENTICATE: 'You have reauthenticate to chage your email.'
  }

  function handleFirebaseErrors(error, message) {
    if (error.code === FIREBASE_ERROR_CODES.EMAIL_ALREADY_IN_USE) {
      throw new Error(ERROR_MESSAGES.EMAIL_ALREADY_IN_USE);
    }

    if (error.code === FIREBASE_ERROR_CODES.INVALID_EMAIL) {
      return ERROR_MESSAGES.INVALID_EMAIL;
    }

    if (error.code === FIREBASE_ERROR_CODES.REAUTHENTICATE) {
      return ERROR_MESSAGES.REAUTHENTICATE;
    }

    if (error.code === FIREBASE_ERROR_CODES.WRONG_PASSWORD) {
      return message;
    }
  }

  return {
    handleFirebaseErrors
  }
}());

export { errorHandler };
