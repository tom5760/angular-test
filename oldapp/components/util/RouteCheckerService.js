'use strict';

angular.module('test.util')
  .factory('RouteCheckerService', function ($log, $state, UserService) {
    return function checkRouteChange(event, toState, toParams) {
      if (!UserService.isAuthenticated() && toState.name.indexOf('main') === 0) {
        $log.info('Not logged in, redirecting to login.');
        event.preventDefault();

        var params = { next: toState.name };

        if (Object.keys(toParams).length > 0) {
          params.params = angular.toJson(toParams);
        }

        $state.go('login', params);
      }
    };
  });
