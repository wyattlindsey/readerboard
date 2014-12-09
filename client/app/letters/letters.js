'use strict';

angular.module('readerboardPlannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('letters', {
        url: '/letters',
        templateUrl: 'app/letters/letters.html',
        controller: 'LettersCtrl'
      });
  });