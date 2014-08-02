'use strict';

describe('model.UserService', function () {

  // Load the service's module
  beforeEach(module('test.model'));

  var UserService;
  var $timeout

  // Instantiate service
  beforeEach(inject(function (_$timeout_, _UserService_) {
    $timeout = _$timeout_;
    UserService = _UserService_;
  }));

  it('should not be authenticated initially', function () {
    expect(UserService.isAuthenticated()).toBe(false);
  });

  it('should have a null username initially', function () {
    expect(UserService.getUserName()).toBe(null);
  });

  it('should reject login with a user name of "bad"', function () {
    var output;

    UserService.login('bad', 'asdf').then(function () {
      output = true;
    }, function () {
      output = false;
    });

    $timeout.flush();

    expect(output).toBe(false);
  });

  it('should reject login with a password of "bad"', function () {
    var output;

    UserService.login('asdf', 'bad').then(function () {
      output = true;
    }, function () {
      output = false;
    });

    $timeout.flush();

    expect(output).toBe(false);
  });

  it('should resolve login with any other username/password"', function () {
    var output;

    UserService.login('asdf', 'asdf').then(function () {
      output = true;
    }, function () {
      output = false;
    });

    $timeout.flush();

    expect(output).toBe(true);
  });

  it('should set the username on successful login', function () {
    UserService.login('asdf', 'asdf');
    $timeout.flush();

    expect(UserService.getUserName()).toBe('asdf');
  });

  it('should be authenticated on successful login', function () {
    UserService.login('asdf', 'asdf');
    $timeout.flush();

    expect(UserService.isAuthenticated()).toBe(true);
  });

  it('should set the username to null on logout', function () {
    UserService.login('asdf', 'asdf');
    $timeout.flush();
    UserService.logout();

    expect(UserService.getUserName()).toBe(null);
  });

  it('should not be authenticated on logout', function () {
    UserService.login('asdf', 'asdf');
    $timeout.flush();
    UserService.logout();

    expect(UserService.isAuthenticated()).toBe(false);
  });
});
