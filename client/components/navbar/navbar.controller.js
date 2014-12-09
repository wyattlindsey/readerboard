'use strict';

angular.module('readerboardPlannerApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'planner',
      'link': '/'
    },
    {
      'title': 'letters',
      'link': '/letters'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });