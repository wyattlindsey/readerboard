'use strict';

angular.module('readerboardPlannerApp').controller('LettersCtrl', function ($scope, $http, Modal) {

  $scope.newSet = {};
  $scope.sets = [];



  var getSets = function() {
    $http.get('/api/sets').success(function(data) {
      $scope.sets = data;
    });
  };

  getSets();


  var createNewSet = function() {
    var newSet = JSON.stringify($scope.newSet);
    $http.post('/api/sets', newSet).success(function(data) {
      getSets();
    });

  };

  $scope.deleteSet = function(id) {
    $http.delete('/api/sets/' + id).success(function() {
      getSets();
    });
  };

  $scope.openCreationModal = Modal.create(createNewSet, $scope.newSet);


});
