'use strict';

describe('Controller: EditModalCtrl', function () {

  // load the controller's module
  beforeEach(module('readerboardPlannerApp'));

  var EditmodalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditmodalCtrl = $controller('EditModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
