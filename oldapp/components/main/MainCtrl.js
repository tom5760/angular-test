'use strict';

angular.module('test.main')
  .controller('MainCtrl', function (UserService) {
    this.UserService = UserService;
    this.isMainNavCollapsed = true;
  });
