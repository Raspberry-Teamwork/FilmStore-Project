import { requester } from 'requester';
import { homeController } from 'home-controller';

const homeControllerTests = function(expect) {
  describe('Home Controller Tests', function() {
    it('Expect home controler to be a class', function () {
        expect(homeController).to.be.a('object');
    });

    it('Expect to have a function loadHomePage.', function() {
      expect(homeController).to.have.property('loadHomePage');
    });
 });

 };

 export { homeControllerTests };
