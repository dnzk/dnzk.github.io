(function(angular) {
  'use strict';

  function customOverlay(CustomOverlayFactory, CharactersFactory) {
    return {
      restrict: 'E',
      templateUrl: 'app/directives/custom-overlay/custom-overlay.template.html',
      link: function(scope, elem, attr) {
        function initialize() {
          scope.wrapper = {
            status: CustomOverlayFactory.overlay
          };
          scope.current = {
            character: CharactersFactory.view
          };
          scope.close = close;
        }
        initialize();

        function close() {
          CustomOverlayFactory.close();
        }
      }
    };
  }
  angular.module('swapi')
    .directive('customOverlay', [
      'CustomOverlayFactory',
      'CharactersFactory',
      customOverlay
    ]);
}(angular));