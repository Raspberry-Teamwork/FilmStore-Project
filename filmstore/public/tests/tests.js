import { homeControllerTests } from 'homeControllerTests';

mocha.setup('bdd');

let expect = chai.expect;

describe('FilmStore Tests', function() {
  homeControllerTests(expect);
});

mocha.run();
