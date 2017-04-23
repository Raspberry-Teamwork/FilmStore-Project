import { validator } from 'validator';

const validatorTests = function(expect) {
  const INVALID = {
    SHORT_EMAIL: 'asdasdas',
    LONG_EMAIL: 'sdadasdasdasdadsdfdsgdfdfdsfgdhf#$%^&gdghgfghgedfgdddghfgdgdhgfdghfdfgdfdsfgdfgfdfghf@gmail.com',
    SHORT_PASSWORD: 'asd',
    LONG_PASSWORD: 'asdasdasdadsadadsada'
  };

  const VALID = {
    EMAIL: "test@gmail.com",
    PASSWORD: "3343568"
  }

  describe('Validator tests', function() {
    it('Expect validator to exist.', function() {
      expect(validator).to.exist;
    });

    it('Expect validator to be a object.', function() {
      expect(validator).to.be.a('object');
    });

    it('Expect to have a function validateEmailAndPassword.', function() {
      expect(validator).to.have.property('validateEmailAndPassword');
      expect(validator.validateEmailAndPassword).to.be.a('function');
    });

    describe('validateEmailAndPassword function tests', function() {
      it('Expect function to not throw a error when the email and password are valid.', function() {
        expect(() => validator.validateEmailAndPassword(VALID.EMAIL, VALID.PASSWORD)).to.not.throw();
      });

      it('Expect function to throw a error when the email is invalid.', function() {
        expect(() => validator.validateEmailAndPassword(INVALID.SHORT_EMAIL, VALID.PASSWORD)).to.throw(Error);
        expect(() => validator.validateEmailAndPassword(INVALID.LONG_EMAIL, VALID.PASSWORD)).to.throw();
      });

      it('Expect function to throw a error when the password is invalid.', function() {
        expect(() => validator.validateEmailAndPassword(VALID.EMAIL, INVALID.SHORT_PASSWORD)).to.throw(Error);
        expect(() => validator.validateEmailAndPassword(VALID.EMAIL, INVALID.LONG_PASSWORD)).to.throw(Error);
      });
    });
  });
};

export { validatorTests };
