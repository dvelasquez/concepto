// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('ConceptoApp', [
    'ionic',
    'App.Controllers',
    'Core',
    'ngStorage'
])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })
    .run(function ($rootScope, $state, $location, $log, $localStorage, $ionicHistory, $window) {
        $log.debug("Main application lifted!!!");

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            if (toState.name !== 'security-login') {
                //Redirige al usuario al login si no esta autenticado
                //$log.debug("no autenticado");
                //$state.go('security-login');
                //event.preventDefault();
            }
        });
        $rootScope.$on('authentication.authenticate', function () {

        });

        $rootScope.$on('authentication.logout', function () {
            $localStorage.$reset();
            $state.go('security-login');
            $ionicHistory.clearCache();
            event.preventDefault();
        });
    })

    .constant('CONFIGURATION', {
        DEFAULT_SYNC_TIME: 10000,
        API_ENDPOINT: 'http://app01-val-prd.cloudapp.net/advent/v1/'
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('security-login', {
                url: '/login',
                templateUrl: 'app/security/views/login.html',
                controller: 'LoginController'
            })
            .state('app', {
                templateUrl: 'app/layout/views/layout.html',
                controller: 'LayoutController',
                abstract: true
            })

            .state('app.home', {
                url: '/home',
                views: {
                    menuContent: {
                        templateUrl: 'app/home/views/home.html',
                        controller: 'HomeController'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });
