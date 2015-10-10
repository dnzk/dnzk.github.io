(function(angular) {
  'use strict';

  angular.module('swapi', [
    'restangular'
  ])
    .config(restangularConfig)
    .factory('CharacterFactory', function(Restangular) {
      var wantedNumberRegex = /page=\d+/g;
      var numberRegex = /\d+/g;
      var currentPage = 1;
      var pages = {};
      var navigation = {
        currentNext: null,
        currentPrevious: null
      };

      function setCurrentPage(nextPageUrl) {
        this.currentPage = nextPageUrl.match(wantedNumberRegex);
        this.currentPage = parseInt(this.currentPage[0].match(numberRegex)[0]) - 1;
      }

      function defaultSuccessHandler(response, success) {
        var plain = response.plain();
        var identifier = sprintf('%s%s', String(plain.next), String(plain.previous))
        setCurrentPage.apply(this, [plain.next]);
        this.pages[this.currentPage] = plain.results;
        this.navigation.currentNext = plain.next;
        this.navigation.currentPrevious = plain.previous;
        success(this.pages[this.currentPage]);
      }

      var Character = function() {};
      Character.prototype.get = function(handlers, navigate) {
        var _this = this;
        if (navigate && navigate === 'next') {
          _this.currentPage += 1;
        } else if (navigate && navigate === 'prev') {
          _this.currentPage = _this.currentPage === 1 ? 1 : _this.currentPage - 1;
        }
        if (_this.pages[_this.currentPage]) {
          handlers.success(_this.pages[_this.currentPage]);
        } else {
          var peoplePage = sprintf('people/?page=%s', String(_this.currentPage));
          Restangular.one(peoplePage).get().then(function(response) {
            defaultSuccessHandler.apply(_this, [response, handlers.success]);
          });
        }
      };
      Character.prototype.currentPage = currentPage;
      Character.prototype.pages = pages;
      Character.prototype.navigation = navigation;
      return new Character();
    })
    .controller('BodyController', function($scope, CharacterFactory) {
      function initialize() {
        $scope.navigate = navigate;
        $scope.characters = {
          list: []
        };
        CharacterFactory.get({
          success: requestSuccess,
          error: requestError
        });
      }

      function navigate(next) {
        CharacterFactory.get({
          success: requestSuccess
        }, next);
      }

      function requestSuccess(list) {
        $scope.characters.list = list;
      }

      function requestError(response) {}
      initialize();
    });

  function restangularConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://swapi.co/api');
  }

})(angular);
