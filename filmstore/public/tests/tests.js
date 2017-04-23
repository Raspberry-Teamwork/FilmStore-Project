import { homeControllerTests } from 'home-controller-tests';
import { validatorTests } from 'validator-tests';
import { notFoundControllerTests } from 'notFound-controller-tests';
import { userControllerTests } from 'user-controller-tests';

mocha.setup('bdd');

let expect = chai.expect;

describe('FilmStore Tests', function() {
  homeControllerTests(expect);
  notFoundControllerTests(expect);

  validatorTests(expect);
});

mocha.run();
