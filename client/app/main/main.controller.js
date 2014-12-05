'use strict';

angular.module('readerboardPlannerApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.textInput = '';
    $scope.readerBoardText = '';
    $scope.readerBoardLetters = [];
    $scope.noMoreLetters = [];
    $scope.atLeastOneLetterIsOut = false;
    $scope.miscCharacters = [
      ' ',
      '\n'
    ];

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

              if(isNaN(letter.quantity)) {
                letter.quantity = 0;
              }

            });

            // set available number of letters to the default
            $scope.resetAvailableLetters();

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

    $scope.textInputChanged = function() {
      $scope.resetAvailableLetters();
      $scope.readerBoardText = '';
      $scope.noMoreLetters.length = 0;

      if (!$scope.textInput.length) {
        $scope.textInput = '';
      }


      _.forEach($scope.textInput, function(letter) {

        var matchingLetter = _.find($scope.readerBoardLetters,
                                      { 'character': letter.toUpperCase() });

        if (typeof matchingLetter != 'undefined') {

          // decrement availability for each letter used
          matchingLetter.available--;

          // keep track of which letters have been used up
          if (matchingLetter.available <= 0) {
            $scope.noMoreLetters.push(matchingLetter);
            // de-duplicate the array
            $scope.noMoreLetters = _.uniq($scope.noMoreLetters, 'character');
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

      if ($scope.noMoreLetters.length > 0) {
        $scope.atLeastOneLetterIsOut = true;
      } else {
        $scope.atLeastOneLetterIsOut = false;
      }
    };

    $scope.setColor = function(letter) {
      if (letter.available >= 0) {
        return {
          'color': '#568B56'
        };
      } else {
        return {
          'color': 'red'
        };
      }
    };

    $scope.showComma = function(letter, arrayOfLetters) {
      if (arrayOfLetters.length > 1 && (letter !== _.last(arrayOfLetters))) {
        return true;
      } else {
        return false;
      }
    }

  });

  /**
   * stopTab() - prevent user from tabbing all over the place
   */

var stopTab = function(e) {
  var evt = e || window.event
  if ( evt.keyCode === 9 ) {
    return false
  }
};


