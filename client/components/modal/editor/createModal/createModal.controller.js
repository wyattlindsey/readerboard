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
    var editing = false; // state of xeditable control
    var currentlyEditedLetter = {};
    $scope.addLetterButtonEnabled = false;

      /**
       * addLetter
       *
       * @param character
       * @param qty
       */


    $scope.addLetter = function(character, qty) {
     if (character && qty ) {
       $scope.newSet.push({
         character: character,
         qty: qty,
         showTrash: false
       });
       resetFields();
     }
    };

      /**
       * deleteLetter
       *
       * @param index
       */

    $scope.deleteLetter = function(index) {
      $scope.newSet.splice(index, 1);
    };

     var resetFields = function() {
       $scope.newLetter = {
         character: '',
         qty: 1
       };
       $scope.addLetterButtonEnabled = false;
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
       if ($scope.newLetter.character) {
         $scope.addLetterButtonEnabled = true;
       } else {
         $scope.addLetterButtonEnabled = false;
       }

     };

     $scope.qtyFieldChanged = function() {
       if (isNaN($scope.newLetter.qty)) {
         $scope.newLetter.qty = $scope.lastQty; // only allow numbers
         return;
       }
       if ($scope.newLetter.qty > 100) {
         $scope.newLetter.qty = 100; // only allow numbers less than or equal 100
       }
     };


      /**
       * validation for angular-xeditable fields
       */

      $scope.validateCharacter = function(data, index) {
        var duplicates = 0;
        if (data.length > 1) {
          return 'only one character';
        } else {
          _.forEach($scope.newSet, function(letter) {
            if (data === letter.character) {
              duplicates++;
            }
          });
          if (duplicates >= 1 && data !== $scope.newSet[index].character) {
            return 'character must be unique';
          }
        }
      };

      /**
       * show/hide for trashcan delete icon, but only for currently edited item when in
       * xeditable form
       */

      $scope.letterHoverEnter = function(letter) {
        if (!editing) {
          return letter.showTrash = true;
        } else if (letter === currentlyEditedLetter) {
          return letter.showTrash = true;
        } else {
          return letter.showTrash = false;
        }
      };

      $scope.letterHoverLeave = function(letter) {
        return letter.showTrash = false;
      };

      /**
       * events for entering and exiting xeditable edit-in-place mode
       *
       */

      $scope.xeditableShow = function(letter) {
        editing = true;
        currentlyEditedLetter = letter;
      };

      $scope.xeditableHide = function() {
        editing = false;
        currentlyEditedLetter = {};
      };
  });
