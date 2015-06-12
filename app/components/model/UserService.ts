/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />

class User {
  constructor(public email: string) {}
}

class UserService {
  static LOGIN_DELAY: number = 1500;

  currentUser: User = null;

  constructor(private $timeout: ng.ITimeoutService,
              private $q: ng.IQService) {}

  login(email: string, password: string) {
    return this.$timeout(() => this.checkLogin(email, password), UserService.LOGIN_DELAY);
  }

  private checkLogin(email: string, password: string) {
    if (email.indexOf('bad') >= 0 || password === 'bad') {
      return this.$q.reject('ERRORS.CREDENTIALS');
    }

    this.currentUser = new User(email);
  }
};

angular.module('test.model')
  .factory('User', User)
  .service('UserService', UserService);
