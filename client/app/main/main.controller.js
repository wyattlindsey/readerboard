'use strict';

angular.module('readerboardPlannerApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.textAreaData = '';
    $scope.readerBoardText = '';
    $scope.readerBoardLetters = [];
    $scope.miscCharacters = [
      ' ',
      '\n'
    ];
    $scope.availability = {
      color: 'black'
    };

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
       * textAreaChanged() - every time the textArea is updated this function iterates through
       * the characters in the area, does some logic to clean up the results and also keeps
       * tabs on the available letters by reducing the default number for each match
       */

    $scope.textAreaChanged = function() {

      $scope.resetAvailableLetters();
      $scope.readerBoardText = '';

      if (!$scope.textAreaData.length) {
        $scope.textAreaData = '';
        $scope.availability = {
          color: 'black'
        }
      }


      _.forEach($scope.textAreaData, function(letter) {
        var matchingLetter = _.find($scope.readerBoardLetters,
                                      { 'character': letter.toUpperCase() });
        if (typeof matchingLetter != 'undefined') {
          matchingLetter.available--;
          if (matchingLetter.available < 0) {
            $scope.availability = {
              color: 'red'
            }
          } else {
            $scope.availability = {
              color: 'black'
            }
          }
        }

        if (typeof matchingLetter != 'undefined' && matchingLetter.available >= 0) {
          // letter is one of the available letters and there are still more left
          $scope.readerBoardText += letter;
        } else {
          // check to see if it matches one of the miscCharacters
          _.forEach($scope.miscCharacters, function(miscCharacter) {
            if (letter === miscCharacter) {
              $scope.readerBoardText += letter;

            }
          });
        }
      });

    };


  });
