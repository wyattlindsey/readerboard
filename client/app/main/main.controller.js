'use strict';

angular.module('readerboardPlannerApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.textAreaData = '';
    $scope.readerBoardText = '';
    $scope.readerBoardLetters = [];

    $('.message').focus();

      /**
       * readConfig() - pull in information from local JSON, clean up the data
       * and get it ready for checkLetters() to use
       */

    this.readConfig = function() {
      $http.get('../app/main/config.json')
          .success(function(data) {
            $scope.readerBoardLetters = data.letters;

            //some initialization work on the collection
            _.forEach($scope.readerBoardLetters, function(letter) {

              // convert any lower case characters to upper
              if (/[a-z]/.test(letter.character)) {
                letter.character = letter.character.toUpperCase();
              }

              // set available number of letters to the default
              $scope.resetAvailableLetters();
            });

            // sort the array
//            $scope.readerBoardLetters = _.sortBy($scope.readerBoardLetters, 'character');

            // make sure there are no duplicates
            $scope.readerBoardLetters = _.uniq($scope.readerBoardLetters, 'character');

          }).error(function() {
            console.log('loading configuration failed');
        });
    };

    this.readConfig();

      /**
       * resetAvailableLetters() set available number of letters to the default
       */

    $scope.resetAvailableLetters = function() {

      _.forEach($scope.readerBoardLetters, function(letter) {
        letter.available = letter.quantity;
      });
    };

      /**
       * checkLetters() - every time the textArea is updated this function iterates through
       * the characters in the area, does some logic to clean up the results and also keeps
       * tabs on the available letters by reducing the default number for each match
       */

    $scope.checkLetters = function() {

      $scope.resetAvailableLetters();
      $scope.readerBoardText = '';

      if (!$scope.textAreaData.length) {
        $scope.textAreaData = '';
      }



      _.forEach($scope.textAreaData, function(letter) {
        var matchingLetter = _.find($scope.readerBoardLetters,
                                      { 'character': letter.toUpperCase() });
        if (typeof matchingLetter != 'undefined') {
          matchingLetter.available--;
        }

        if ((typeof matchingLetter != 'undefined' && matchingLetter.available >= 0)
            || letter === ' ') {

              $scope.readerBoardText += letter;
        }
      });

    };

    $scope.textAreaChanged = function() {
      $scope.checkLetters();
//      $scope.readerBoardText = $scope.textAreaData;
    };


  });
