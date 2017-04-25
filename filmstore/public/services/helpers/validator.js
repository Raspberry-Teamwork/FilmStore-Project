let validator = (function() {
  const PATTERNS = {
        NAME_PATTERN: /[^a-zA-Z]/,
        PASSWORD_PATTERN: /(?=.*\d).{6,20}/,
        USER_NAME_PATTERN: /\S[_a-zA-Z0-9]{5,10}/,
        EMAIL_PATTERN: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
        RESTRICTED_SYMBOLS_PATTERN: /[<>$@#&]/gm
  };

  const ERROR_MESSAGES = {
        INVALID_EMAIL: 'The entered email is not valid please try again.',
        INVALID_PASSWORD: 'The password must be between 6 and 20 characters long and must have letters and digits please try again.'
  };

  function isEmpty(word, errMessage) {
    if (word.length < 1) {
      throw new Error(errMessage);
    }
  }

  function isBetween(word, minLength, maxLength, errMessage) {
    if (word.length < minLength || word.length > maxLength) {
      throw new Error(errMessage);
    }
  }

  function validateUrl(url, errMessage) {
    let isWrong = url.indexOf('http') < 0 &&
                  url.indexOf('https') < 0;

    console.log(url.indexOf('https'));
    console.log(url);

    if (isWrong) {
      throw new Error(errMessage);
    }
  }

  function validateEmailAndPassword(email, password) {
    if (!PATTERNS.EMAIL_PATTERN.test(email)) {
      throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
    }

    if (!PATTERNS.PASSWORD_PATTERN.test(password)) {
      throw new Error(ERROR_MESSAGES.INVALID_PASSWORD);
    }
  }

  return {
    validateEmailAndPassword,
    isEmpty,
    isBetween,
    validateUrl
  }
}());

export { validator };
