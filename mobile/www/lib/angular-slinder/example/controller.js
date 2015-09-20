'use strict';

/**
 * @ngdoc function
 * @name trackApp.controller:DriveCtrl
 * @description
 * # DriveCtrl
 * Controller of the trackApp
 */
angular.module('trackApp')
  .controller('DriveCtrl', function ($scope, $state) {

      $scope.navPosition = 33;
      $scope.currentPage = 0;

      $scope.$on('positionChange', function (event, x) {
        
          $('#slidingBar').css('left', -(x) / 3 + '%');

      });

  });
