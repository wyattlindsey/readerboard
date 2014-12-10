'use strict';

angular.module('readerboardPlannerApp')
  .controller('LettersCtrl', function ($scope, Modal) {

    $scope.delete = Modal.confirm.delete(function() {
      console.log('test');
    });
  });
