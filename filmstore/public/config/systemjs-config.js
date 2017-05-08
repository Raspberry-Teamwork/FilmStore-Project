SystemJS.config({
  'transpiler': 'plugin-babel',
  'map': {
    'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
    'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
    'main': './app.js',

    'vue':'./../node_modules/vue/dist/vue.js',
    'vue-select':'./../node_modules/vue-select/dist/vue-select.js',
    'firebase': './../node_modules/firebase/firebase.js',
    'requester': './../requester/requester.js',

    'user-service': './../services/user-service.js',
    'movies-service': './../services/movies-service.js',
    'genres-service': './../services/genres-service.js',
    'search-service': './../services/search-service.js',

    'validator': './../services/helpers/validator.js',
    'error-handler': './../services/helpers/error-handler.js'
  }
});

SystemJS.import('main');
