SystemJS.config({
  'transpiler': 'plugin-babel',
  'map': {
    'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
    'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
    'main': './app.js',
    'firebase': './../node_modules/firebase/firebase.js',
    'requester': './../requester/requester.js',

    'userService': './../services/user-service.js',
    'validator': './../services/helpers/validator.js',
    'error-handler': './../services/helpers/error-handler.js'
  }
});

SystemJS.import('main');
