(function(angular) {
  'use strict';

  function CharactersController($scope, CharactersFactory) {
    function initialize() {
      $scope.characters = {
        list: []
      };
      CharactersFactory.get({
        success: requestSuccess
      });
      $scope.navigate = navigate;
    }

    function navigate(next) {
      CharactersFactory.get({
        success: requestSuccess
      }, next);
    }

    function requestSuccess(list) {
      $scope.characters.list = list;
    }

    function requestError(response) {}
    initialize();
  }
  angular.module('swapi')
    .controller('CharactersController', [
      '$scope',
      'CharactersFactory',
      CharactersController
    ]);
}(angular));