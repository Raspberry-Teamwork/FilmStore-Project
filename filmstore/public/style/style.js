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
