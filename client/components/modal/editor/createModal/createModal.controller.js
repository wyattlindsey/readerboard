'use strict';

angular.module('readerboardPlannerApp')
  .controller('CreateModalCtrl', function ($scope) {

     $scope.letters = [];
     $scope.newLetter = {};

     $scope.addLetter = function(character, qty) {
       $scope.letters.push({
         character: character,
         qty: qty
       });
     };


  });
