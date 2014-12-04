'use strict';

angular.module('readerboardPlannerApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.textAreaData = '';
    $('.message').focus();

    $scope.textAreaChanged = function() {
      
    };
  });
