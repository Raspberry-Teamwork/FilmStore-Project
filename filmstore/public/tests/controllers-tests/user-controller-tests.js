import { requester } from 'requester';
import { errorHandler } from 'error-handler';
import { userController } from 'user-controller';
import { userService } from 'user-service';

// NOTE: THIS UNIT TESTS ARE WRONG. THE WILL BE FIXED LATTER.


const userControllerTests = function(expect) {
   describe('User Controller tests', function() {
     it('Expect user controller to exist.', function() {
       expect(userController).to.exist;
     });

     it('Expect userController to have a properties loadSignUpPage, loadSignInPage, showAccount, signUp, signIn, signOut and onAuthStateChanged.', function() {
       expect(userController).to.have.property('loadSignUpPage');
       expect(userController).to.have.property('loadSignInPage');
       expect(userController).to.have.property('showAccount');
       expect(userController).to.have.property('signUp');
       expect(userController).to.have.property('signIn');
       expect(userController).to.have.property('signOut');
       expect(userController).to.have.property('onAuthStateChanged');
     });

     describe('loadSignUpPage function tests.', function() {
       it('Expect loadSignUpPage to be a function', function() {
         expect(userController.loadSignUpPage).to.be.a('function');
       });

       it('Expect loadSignUpPage to call the get function once.', function() {
         let getSpy = sinon.spy(requester, 'get');

         userController.loadSignUpPage();

         getSpy.restore();
         sinon.assert.calledOnce(getSpy);
       });
     });

     describe('loadSignInPage function tests.', function() {
       it('Expect loadSignInPage to be a function', function() {
         expect(userController.loadSignInPage).to.be.a('function');
       });

       it('Expect loadSignInPage to call the get function once.', function() {
         let getSpy = sinon.spy(requester, 'get');

         userController.loadSignInPage();

         getSpy.restore();
         sinon.assert.calledOnce(getSpy);
       });
     });

     describe('signUp function tests.', function() {
       it('Expect signUp to be a function', function() {
         expect(userController.signUp).to.be.a('function');
       });

       it('Expect signUp to call the signUpWithEmailAndPassword function once.', function() {
         let signUpWithEmailAndPasswordSpy = sinon.stub(userService, 'signUpWithEmailAndPassword', function() { return; }),
             toastrSpy = sinon.stub(toastr, 'error', function() { return; });

         userController.signUp();

         signUpWithEmailAndPasswordSpy.restore();
         toastrSpy.restore();

         sinon.assert.calledOnce(signUpWithEmailAndPasswordSpy);
       });
     });

     describe('signIn function tests.', function() {
       it('Expect signIn to be a function', function() {
         expect(userController.signIn).to.be.a('function');
       });

       it('Expect signIn to call the signInWithEmailAndPassword function once.', function() {
         let signInWithEmailAndPasswordStub = sinon.stub(userService, 'signInWithEmailAndPassword', function(a) { return a; }),
              catchStub = sinon.stub(a, 'catch', function(a) { return a; });

         userController.signIn();

         signInWithEmailAndPasswordStub.restore();
         catchStub.restore();

         sinon.assert.calledOnce(signInWithEmailAndPasswordStub);
       });
     });

     describe('signOut function tests.', function() {
       it('Expect signOut to be a function', function() {
         expect(userController.signOut).to.be.a('function');
       });

      //  it('Expect signOut to call the signOut function from the service once.', function() {
      //    let signOutSpy = sinon.spy(userService, 'signOut'),
      //
       //
      //    userController.signOut();
       //
      //    signOutSpy.restore();
      //    sinon.assert.calledOnce(signOutSpy);
      //  });
     });
   });
};

export { userControllerTests };
