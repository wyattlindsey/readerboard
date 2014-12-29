'use strict';

angular.module('readerboardPlannerApp').controller('LettersCtrl', function ($scope, $http, Modal) {

  $scope.sets = [];
  $scope.thisSet = {};

  /**
   * getSets - pull in sets from api endpoint
   *
   */
  var getSets = function() {
    $http.get('/api/sets').success(function(data) {
      $scope.sets = data;
    });
  };

  getSets(); // pull in set data on first time through

  $scope.$on('refreshSetList', function() {
    getSets();
  });


  /**
   * createNewSet - this function is called when the creation modal is closed
   *
   */

  var createNewSet = function() {

    var newSet;

    newSet = $scope.thisSet;

    newSet.title = getUniqueTitle(newSet.title);

    $http.post('/api/sets', JSON.stringify(newSet)).success(function() {
      $scope.newSet = false;
      getSets();
    });

  };

  /**
   * deleteSet
   *
   * @param id
   */

  var deleteSet = function() {
    var itemData;

    itemData = $scope.thisSet;
    $http.delete('/api/sets/' + itemData.id).success(function() {
      getSets();
    });
  };



  /**
   * copySet
   *
   * @param id
   */

  // does this need to be $scope level?

  $scope.copySet = function(thisSet) {
    var copySetData = {};
    copySetData.title = thisSet.title;
    copySetData.letters = thisSet.letters;
    createNewSet(copySetData);
  };

  /**
   * editSet
   *
   * @param id
   */

  var editSet = function() {
    console.log('editing');
  };

  /**
   * getUniqueTitle - takes a string, checks the other titles, and returns a unique title
   *
   * @param title
   * @returns {*} unique title string
   */

  var getUniqueTitle = function(title) {
    _.each($scope.sets, function(thisSet) {
      if (thisSet.title === title) {
        title += ' copy';
        getUniqueTitle(title); // recursively call this function to verify that appending
                               // ' copy' to the end isn't just another duplicated name
      }
    });
    return title; // title is unique
  };


  $scope.openCreationModal = Modal.edit(createNewSet, $scope.thisSet, 'create');
  $scope.openEditSetModal = Modal.edit(editSet, $scope.thisSet, 'edit');
  $scope.openDeleteConfirmModal = Modal.confirm.delete(deleteSet, $scope.thisSet);

});
