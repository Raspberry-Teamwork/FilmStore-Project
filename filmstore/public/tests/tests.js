import { homeControllerTests } from 'home-controller-tests';
import { validatorTests } from 'validator-tests';

mocha.setup('bdd');

let expect = chai.expect;

describe('FilmStore Tests', function() {
  homeControllerTests(expect);

  validatorTests(expect);
});

mocha.run();
