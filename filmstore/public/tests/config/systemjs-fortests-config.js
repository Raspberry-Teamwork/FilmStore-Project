SystemJS.config({
            'transpiler': 'plugin-babel',
            'map': {
                'plugin-babel': './../node_modules/systemjs-plugin-babel/plugin-babel.js',
                'systemjs-babel-build': './../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
                'main': './tests.js',

                'requester': './../../requester/requester.js',
                'home-controller': './../../controllers/home-controller.js',
                'validator': './../../services/helpers/validator.js',

                'home-controller-tests': './controllers-tests/home-controller-tests.js',
                'validator-tests': './services-tests/helpers/validator-tests.js'
            }
        });

System.import('main');
