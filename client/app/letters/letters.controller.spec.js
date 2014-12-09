'use strict';

describe('Controller: LettersCtrl', function () {

  // load the controller's module
  beforeEach(module('readerboardPlannerApp'));

  var LettersCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LettersCtrl = $controller('LettersCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
