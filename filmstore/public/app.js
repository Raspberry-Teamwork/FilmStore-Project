
import { homeController } from './controllers/home-controller.js';
import { userController } from './controllers/user-controller.js';
import { notFoundController } from './controllers/notFound-controller.js';
import { moviesController } from './controllers/movies-controller.js';
import { genresController } from './controllers/genres-controller.js';
import { menugenerator } from './controllers/genres-menu-controller.js';
$( document ).ready(menugenerator.loadMenuWithTheAllGenres);

import { searchController } from './controllers/search-controller.js';


let app = $.sammy('#main-content', function() {

  this.get('#/home', homeController.loadHomePage);

  this.get('#/signup', userController.loadSignUpPage);
  this.get('#/signin', userController.loadSignInPage);
  this.get('#/signin-with-facebook', userController.signInWithFacebook);

  this.get('#/signout', userController.signOut);

  this.post('#/signup', userController.signUp);
  this.post('#/signin', userController.signIn);

  this.get('#/all-movies', moviesController.loadThePageWithTheAllMovies);
  this.get('#/all-movies/:name', moviesController.loadCurrentMovie);

  this.get('#/add-movie', moviesController.loadAddMoviePage);
  this.get('#/add-movie-from-imdb', moviesController.loadAddMovieFromIMDBPage);
  this.get('#/add-to-watchlist', moviesController.addMovieToWatchlist);
  this.any(menugenerator.loadMenuWithTheAllGenres);
  this.get('#/top-movies', moviesController.loadTopMoviesPage);

  this.get('#/genres/:genre',genresController.loadGenreMovie);

  this.post('#/add-movie', moviesController.addMovie);
  this.post('#/add-movie-from-imdb', moviesController.addMovieFromIMDB);

  this.get('#/profile/change-email', userController.loadChangeEmailPage);
  this.get('#/profile/change-profile-picture', userController.loadChangeProfilePicturePage);
  this.get('#/profile/change-username', userController.loadChangeUsernamePage);
  this.get('#/profile/change-password', userController.loadChangePasswordPage);
  this.get('#/profile/:username', userController.loadProfilePage);

  this.post('#/profile/changeEmail', userController.changeEmail);
  this.post('#/profile/change-username', userController.changeUsername);
  this.post('#/profile/change-profile-picture', userController.changeProfilePicture);
  this.post('#/profile/change-password', userController.changePassword);

  this.get('#/searcher', searchController.loadSearchPage);
  this.get('#/search-movie', searchController.search);

  this.post('#/add-movie', moviesController.addMovie);
  this.notFound = function() {
    notFoundController.loadNotFoundPage();
  };

});

app.run('#/home');
userController.onAuthStateChanged(function(user) {
  if (user) {
    $('.browse').removeClass('invisible');
    $('#singin').addClass('invisible');
    $('.signup').addClass('invisible');
    $('.account').removeClass('invisible');
    $('#add-trailer').removeClass('invisible');

    userController.showAccount(user);

    console.log('logged');
  } else {
    $('.browse').addClass('invisible');
    $('#add-trailer').addClass('invisible');
    $('#singin').removeClass('invisible');
    $('.signup').removeClass('invisible');
    $('.account').addClass('invisible');

    console.log('not logged');
  }
});
