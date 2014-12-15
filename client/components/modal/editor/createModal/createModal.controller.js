'use strict';

angular.module('readerboardPlannerApp')
  .controller('CreateModalCtrl', function ($scope) {

     $scope.letters = [];
     $scope.lastQty = '1',
     $scope.newLetter = {
       character: '',
       qty: 1
     };


     $scope.addLetter = function(character, qty) {
       if (character && qty ) {
         $scope.letters.push({
           character: character,
           qty: qty
         });
       }
     };

     /**
      * validation for new letter fields
      */

     $scope.characterFieldChanged = function() {
       $scope.newLetter.character = _.last($scope.newLetter.character);
     };

     $scope.qtyFieldChanged = function() {
       if (isNaN($scope.newLetter.qty)) {
         $scope.newLetter.qty = $scope.lastQty;
       }
       if ($scope.newLetter.qty > 99) {
         $scope.newLetter.qty = 99;
       }
     };


  });