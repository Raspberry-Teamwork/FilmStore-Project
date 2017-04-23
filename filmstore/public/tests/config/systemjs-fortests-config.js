SystemJS.config({
            'transpiler': 'plugin-babel',
            'map': {
                'plugin-babel': './../node_modules/systemjs-plugin-babel/plugin-babel.js',
                'systemjs-babel-build': './../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
                'main': './tests.js',

                'requester': './../../requester/requester.js',
                'home-controller': './../../controllers/home-controller.js',
                'notFound-controller': './../../controllers/notFound-controller.js',
                'user-controller': './../../controllers/user-controller.js',
                'validator': './../../services/helpers/validator.js',
                'error-handler': './../../services/helpers/error-handler.js',

                'user-service': './../../services/user-service.js',

                'home-controller-tests': './controllers-tests/home-controller-tests.js',
                'notFound-controller-tests': './controllers-tests/notFound-controller-tests.js',
                'user-controller-tests': './controllers-tests/user-controller-tests.js',
                'validator-tests': './services-tests/helpers/validator-tests.js'
            }
        });

System.import('main');
