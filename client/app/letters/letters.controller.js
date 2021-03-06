'use strict';

angular.module('readerboardPlannerApp').controller('LettersCtrl', function ($scope, $http, Modal) {

  $scope.sets = [];
  $scope.thisSet = {};
  $scope.editModalType = '';

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
    })
        .error(function(data) {
          console.log(data);
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
    })
        .error(function(data) {
          console.log(data);
        });
  };



  /**
   * copySet
   *
   * @param sourceSet
   */

  $scope.copySet = function(sourceSet) {
    $scope.thisSet = {};
    $scope.thisSet.title = sourceSet.title;
    $scope.thisSet.letters = [];
    _.each(sourceSet.letters, function(letter) {
      $scope.thisSet.letters.push({
        'character': letter.character,
        'qty': letter.qty
      });
    });
    createNewSet();
  };

  /**
   * editSet
   *
   * @param id
   */

  var editSet = function() {

    // I can't seem to update the thisSet.letters array with $http.post on thisSet - it just
    // ends up giving me a bunch of the first element.  Maybe this is some mongoose weirdness.
    // For now, I'm just deleting the existing set and pushing another one up there with the
    // modified values

    $http.delete('/api/sets/' + $scope.thisSet._id).success(function() {
      $scope.copySet($scope.thisSet);
    });

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
