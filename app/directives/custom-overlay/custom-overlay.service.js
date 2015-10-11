(function(angular, sprintf) {
  'use strict';

  function CustomOverlayFactory() {
    var overlay = {
      open: false
    };
    var Overlay = function() {};
    Overlay.prototype.overlay = overlay;
    Overlay.prototype.open = function() {
      this.overlay.open = true;
    };
    Overlay.prototype.close = function() {
      this.overlay.open = false;
    };
    return new Overlay();
  }
  angular.module('swapi')
    .factory('CustomOverlayFactory', [
      CustomOverlayFactory
    ]);
}(angular, sprintf));