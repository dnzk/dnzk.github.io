(function(angular) {
  'use strict';

  angular.module('swapi', [
    'restangular'
  ])
    .config(restangularConfig)
    .controller('BodyController', function($scope, Restangular) {
      function initialize() {
        $scope.characters = {
          list: []
        };
        Restangular.one('people').get().then(function(response) {
          var plain = response.plain();
          $scope.characters.list = plain.results;
        });
      }
      initialize();
    });

  function restangularConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://swapi.co/api');
  }

})(angular);
