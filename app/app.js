(function(angular) {
  'use strict';
  angular.module('swapi', [
      'ui.router',
      'restangular'
    ])
    .config(restangularConfig)
    .config(routerConfig)

  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        views: {
          '': {
            templateUrl: 'app/main/main.html'
          },
          'characters@home': {
            templateUrl: 'app/characters/characters.html',
            controller: 'CharactersController'
          }
        }
      });
  }

  function restangularConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://swapi.co/api');
  }
})(angular);