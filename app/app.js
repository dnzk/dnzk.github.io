(function(angular) {
  'use strict';

  angular.module('swapi', [])
    .controller('BodyController', function($scope) {
      function initialize() {
        $scope.hail = 'Chthulu';
      }
      initialize();
    });
})(angular);
