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

    describe('loadHomePage function tests', function() {
      it('Expect loadNotFoundPage to be a function.', function() {
        expect(homeController.loadHomePage).to.be.a('function');
      });

      it('Expect get function to be called once.', function() {
        let get = sinon.spy(requester, 'get');

        homeController.loadHomePage();

        get.restore();
        sinon.assert.calledOnce(get);
      });
    });
 });

 };

 export { homeControllerTests };
