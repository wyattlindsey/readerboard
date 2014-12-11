'use strict';

describe('Controller: createModalCtrl', function () {

  // load the controller's module
  beforeEach(module('readerboardPlannerApp'));

  var createModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    createModalCtrl = $controller('createModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
