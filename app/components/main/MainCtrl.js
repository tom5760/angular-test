'use strict';

angular.module('test.main')
  .controller('MainCtrl', function ($scope, UserService) {
    $scope.UserService = UserService;
    $scope.isMainNavCollapsed = true;

    $scope.setMainNavState = function (state) {
      if (!angular.isDefined(state)) {
        state = !$scope.isMainNavCollapsed;
      }
      $scope.isMainNavCollapsed = state;
    };
  });
