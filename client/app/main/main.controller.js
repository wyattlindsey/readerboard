'use strict';

angular.module('readerboardPlannerApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.textAreaData = '';
    $scope.readerBoardText = '';
    $scope.readerBoardLetters = [];

    $('.message').focus();

    this.readConfig = function() {
      $http.get('../app/main/config.json')
          .success(function(data) {
            $scope.readerBoardLetters = data.letters;

            // convert any lower case characters to upper
            _.forEach($scope.readerBoardLetters, function(letter) {
              if (/[a-z]/.test(letter.character)) {
                letter.character = letter.character.toUpperCase();
              }
            });

            // sort the array
            $scope.readerBoardLetters = _.sortBy($scope.readerBoardLetters, 'character');

            // make sure there are no duplicates
            $scope.readerBoardLetters = _.uniq($scope.readerBoardLetters, 'character');

          }).error(function() {
            console.log('loading configuration failed');
        });
    };

    this.readConfig();


    $scope.checkLetters = function() {
      var lastCharacterTyped = _.last($scope.textAreaData);

      _.forEach($scope.textAreaData, function(character) {

      });
    };

    $scope.textAreaChanged = function() {
      $scope.checkLetters();
      $scope.readerBoardText = $scope.textAreaData;
    };


  });
