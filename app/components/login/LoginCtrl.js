'use strict';

angular.module('test.login')
  .controller('LoginCtrl', function ($log, $state, $stateParams, UserService) {
    var self = this;

    this.error = false;

    this.validators = {
      '*': { disabled: false },
      username: { required: true },
      password: { required: true },
    };

    this.login = function () {
      if (this.form.$invalid) {
        return;
      }

      this.validators['*'].disabled = true;

      return UserService.login(this.username, this.password)
        .then(function success() {
          self.error = false;

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
          $log.debug('Login failure');
          self.error = true;

        }).finally(function () {
          self.validators['*'].disabled = false;
          delete self.password;

          self.form.$setPristine();
          self.form.password.$setUntouched();
        });
    };
  });
