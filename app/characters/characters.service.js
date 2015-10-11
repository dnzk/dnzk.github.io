(function(angular, sprintf) {
  'use strict';

  function CharactersFactory(Restangular) {
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
    var Characters = function() {};
    Characters.prototype.get = function(handlers, navigate) {
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
    Characters.prototype.currentPage = currentPage;
    Characters.prototype.pages = pages;
    Characters.prototype.navigation = navigation;
    return new Characters();
  }
  angular.module('swapi')
    .factory('CharactersFactory', [
      'Restangular',
      CharactersFactory
    ]);
}(angular, sprintf));