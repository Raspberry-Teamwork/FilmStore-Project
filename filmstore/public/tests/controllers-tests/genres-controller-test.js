import { requester } from 'requester';
import { genresController as gen } from 'genres-service';

const GenreContorllerTests = function(expect) {

  describe('Genre Controller Tests', function() {
    it('Expect genre controler to be a class', function () {
        expect(gen).to.be.a('object');
    });

    it('Expect to have a function loadGenreMovie.', function() {
      expect(gen).to.have.property('loadGenreMovie');
    });

    describe('loadGenreMovie function tests', function() {
      it('Expect loadGenreMovie to be a function.', function() {
        expect(gen.loadGenreMovie).to.be.a('function');
      });

      it('Expect loadGenreMovie function to be called once.', function() {
        let get = sinon.spy(requester, 'loadGenreMovie');

        get.loadGenreMovie();

        sinon.assert.calledOnce(get);
      });
    });
 });

 };

 export { GenreContorllerTests };
