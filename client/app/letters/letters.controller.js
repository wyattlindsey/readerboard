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

    $scope.newSet.title = getUniqueTitle($scope.newSet.title);

    $http.post('/api/sets', JSON.stringify($scope.newSet)).success(function(data) {
      getSets();
    });

  };

  $scope.deleteSet = function(id) {
    $http.delete('/api/sets/' + id).success(function() {
      getSets();
    });
  };

  $scope.copySet = function(id) {
    console.log('copy');
  };

  $scope.editSet = function(id) {
    console.log('edit');
  };

  var getUniqueTitle = function(title) {
    _.each($scope.sets, function(thisSet) {
      if (thisSet.title === title) {
        title += ' copy';
        getUniqueTitle(title);
      }
    });

    return title;

  };

  $scope.openCreationModal = Modal.create(createNewSet, $scope.newSet);


});
