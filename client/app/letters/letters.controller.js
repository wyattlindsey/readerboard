'use strict';

angular.module('readerboardPlannerApp')
  .controller('LettersCtrl', function ($scope, Modal) {


    var createNewSet = function() {
      console.log('creating');
    };

    $scope.create = Modal.create(createNewSet);
  });
