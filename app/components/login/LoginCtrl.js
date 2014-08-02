'use strict';

angular.module('test.login')
  .controller('LoginCtrl', function ($scope, $log, $state, $stateParams, UserService) {
    $scope.forms = {};
    $scope.credentials = {};
    $scope.error = false;

    $scope.validators = {
      '*': { disabled: false },
      username: { required: true },
      password: { required: true },
    };

    $scope.login = function (credentials) {
      if ($scope.forms.login.$invalid) {
        return;
      }

      $scope.validators['*'].disabled = true;

      return UserService.login(credentials.username, credentials.password)
        .then(function success() {
          $scope.error = false;

          var next = 'main.photos';
          var params = {};

          if (angular.isString($stateParams.next)) {
            next = $stateParams.next;
          }

          if (angular.isString($stateParams.params)) {
            params = angular.fromJson($stateParams.params);
          }

          $log.debug('Login success, redirecting to', next, params);

          $state.go(next, params);

        }, function failure(error) {
          $log.debug('Login failure:', error);
          $scope.error = true;

        }).finally(function () {
          $scope.validators['*'].disabled = false;
          delete $scope.credentials.password;
          $scope.forms.login.password.$setUntouched();
        });
    };
  });
