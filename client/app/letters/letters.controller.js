'use strict';

angular.module('readerboardPlannerApp')
  .controller('LettersCtrl', function ($scope, Modal) {

    $scope.create = Modal.create(function() {
      console.log('test');
    });
  });
