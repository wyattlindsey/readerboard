'use strict';

angular.module('readerboardPlannerApp').controller('LettersCtrl', function ($scope, $http, Modal) {

  $scope.newSet = {};
  $scope.sets = [];
  $scope.thisItem = {};



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


  /**
   * createNewSet - this function is called when the creation modal is closed
   *
   */

  var createNewSet = function() {

    var newSet;

    newSet = $scope.newSet;

    newSet.title = getUniqueTitle(newSet.title);

    $http.post('/api/sets', JSON.stringify(newSet)).success(function() {
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

    itemData = $scope.thisItem;
    $http.delete('/api/sets/' + itemData.id).success(function() {
      getSets();
    });
  };



  /**
   * copySet
   *
   * @param id
   */

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

  $scope.editSet = function(thisSet) {
    console.log('edit');
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


  $scope.openCreationModal = Modal.create(createNewSet, $scope.newSet);
  $scope.openDeleteConfirmModal = Modal.confirm.delete(deleteSet, $scope.thisItem);

});
