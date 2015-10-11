(function(angular) {
  'use strict';
  angular.module('swapi', [
      'restangular'
    ])
    .config(restangularConfig)

  function restangularConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://swapi.co/api');
  }
})(angular);