'use strict';

angular.module('test.model')
  .service('UserService', function ($q, $timeout) {

    /*** PRIVATE MEMBERS ***/

    var LOGIN_DELAY = 1500;
    var username = null;

    /*** PUBLIC METHODS ***/

    this.getUserName = function () {
      return username;
    };

    this.setUserName = function (name) {
      username = name;
    };

    this.login = function (user, pass) {
      // Simulate asynchronous call
      var deferred = $q.defer();
      $timeout(function () {
        if (user === 'bad' || pass === 'bad') {
          deferred.reject();
        } else {
          username = user;
          deferred.resolve();
        }
      }, LOGIN_DELAY);

      return deferred.promise;
    };

    this.logout = function () {
      username = null;
    };

    this.isAuthenticated = function () {
      return angular.isString(username) && username.length > 0;
    };
  });
