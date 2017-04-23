import { requester } from 'requester';
import { notFoundController } from 'notFound-controller';

const notFoundControllerTests = function(expect) {
 describe('notFound Controller Tests', function() {
   it('Expect notFound controller to exist.', function() {
     expect(notFoundController).to.exist;
   });

   it('Expect notFound controller to be a class.', function() {
     expect(notFoundController).to.be.a('object');
   });

   it('Expect notFound controller to have a function loadNotFoundPage.', function() {
     expect(notFoundController).to.have.property('loadNotFoundPage');
   });

   describe('loadNotFoundPage function tests', function() {
     it('Expect loadNotFoundPage to be a function.', function() {
       expect(notFoundController.loadNotFoundPage).to.be.a('function');
     });

     it('Expect loadNotFoundPage to call get function once.', function() {
       let get = sinon.spy(requester, 'get');

       notFoundController.loadNotFoundPage();

       get.restore();
       sinon.assert.calledOnce(get);
     });
   });
 });
};

export { notFoundControllerTests };
