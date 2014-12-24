'use strict';

angular.module('readerboardPlannerApp').controller('LettersCtrl', function ($scope, Modal) {

  $scope.newSet = {};

  var createNewSet = function() {
  };

  $scope.openCreationModal = Modal.create(createNewSet, $scope.newSet);


});
