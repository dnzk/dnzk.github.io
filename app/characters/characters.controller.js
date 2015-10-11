(function(angular) {
  'use strict';

  function CharactersController($scope, CharactersFactory, CustomOverlayFactory) {
    function initialize() {
      $scope.characters = {
        list: []
      };
      CharactersFactory.get({
        success: requestSuccess
      });
      $scope.navigate = navigate;
      $scope.view = view;
    }

    function view(character) {
      CharactersFactory.view.current = character;
      CustomOverlayFactory.open();
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
      'CustomOverlayFactory',
      CharactersController
    ]);
}(angular));