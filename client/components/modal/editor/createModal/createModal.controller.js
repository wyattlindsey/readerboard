'use strict';

angular.module('readerboardPlannerApp')
  .controller('CreateModalCtrl', function ($scope) {

     $scope.newSet = [];
     $scope.newSetTitle = 'untitled set';
     $scope.lastQty = '1',
     $scope.newLetter = {
       character: '',
       qty: 1
     };


     $scope.addLetter = function(character, qty) {
       if (character && qty ) {
         $scope.newSet.push({
           character: character,
           qty: qty
         });
         resetFields();
       }
     };

     var resetFields = function() {
       $scope.newLetter = {
         character: '',
         qty: 1
       };
     };

     /**
      * validation for new letter fields
      */

     $scope.characterFieldChanged = function() {
       $scope.newLetter.character = _.last($scope.newLetter.character); // only the last typed character is held
       // only allow unique characters
       _.forEach($scope.newSet, function(letter) {
         if (letter.character === $scope.newLetter.character) {
           resetFields();
           return;
         }
       });

     };

     $scope.qtyFieldChanged = function() {
       if (isNaN($scope.newLetter.qty)) {
         $scope.newLetter.qty = $scope.lastQty; // only allow numbers
         return;
       }
       if ($scope.newLetter.qty > 99) {
         $scope.newLetter.qty = 99; // only allow numbers less than 100
       }
     };


  });
