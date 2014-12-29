'use strict';

angular.module('readerboardPlannerApp')
    .controller('EditModalCtrl', function ($scope) {


    // initialize if creating new set
    if (!$scope.thisSet.title) {
      $scope.thisSet.letters = [];
      $scope.thisSet.title = 'untitled set';
    }

    $scope.newLetter = {
     character: '',
     qty: 1
    };

    var editing = false; // state of xeditable control
    var currentlyEditedLetter = {};
    var lastQty = '1';
    $scope.addLetterButtonEnabled = false;


      /**
       * addLetter
       *
       * @param character
       * @param qty
       *
       */


    $scope.addLetter = function(character, qty) {
     if (character && qty ) {
       $scope.thisSet.letters.push({
         character: character,
         qty: qty,
         showTrash: false  // throwaway value not saved in model, just used for display
       });
       resetControls();
     }
    };

      /**
       * deleteLetter
       *
       * @param index
       */

    $scope.deleteLetter = function(index) {
      $scope.thisSet.letters.splice(index, 1);
      resetControls();
    };

     var resetControls = function() {
       $scope.newLetter = {
         character: '',
         qty: 1
       };
       $scope.addLetterButtonEnabled = false;
       if ($scope.thisSet.letters.length > 0) {
         $scope.modal.buttons[0].enabled = true;
       } else {
         $scope.modal.buttons[0].enabled = false;
       }
     };


     /**
      * validation for new letter fields
      */

     $scope.characterFieldChanged = function() {
       $scope.newLetter.character = _.last($scope.newLetter.character); // only the last typed character is held
       // only allow unique characters
       _.forEach($scope.thisSet.letters, function(letter) {
         if (letter.character === $scope.newLetter.character) {
           resetControls();
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
         $scope.newLetter.qty = lastQty; // only allow numbers
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
          _.forEach($scope.thisSet.letters, function(letter) {
            if (data === letter.character) {
              duplicates++;
            }
          });
          if (duplicates >= 1 && data !== $scope.thisSet[index].character) {
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
