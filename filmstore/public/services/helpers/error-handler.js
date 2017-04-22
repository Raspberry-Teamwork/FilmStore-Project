let errorHandler = (function() {
  const FIREBASE_ERROR_CODES = {
    EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use'
  };

  const ERROR_MESSAGES = {
    EMAIL_ALREADY_IN_USE: 'Email already in use please try again.'
  }

  function handleFirebaseErrors(error) {
    if (error.code === FIREBASE_ERROR_CODES.EMAIL_ALREADY_IN_USE) {
      throw new Error(ERROR_MESSAGES.EMAIL_ALREADY_IN_USE);
    }
  }

  return {
    handleFirebaseErrors
  }
}());

export { errorHandler };
