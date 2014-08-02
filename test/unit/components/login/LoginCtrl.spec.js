'use strict';

describe('login.LoginCtrl', function () {

  // Load the controller's module
  beforeEach(module('test.login'));

  var LoginCtrl;
  var scope;
  var loginDeferred;
  var MockStateService, MockStateParamsService, MockUserService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($q, $controller, $rootScope) {
    loginDeferred = $q.defer();
    scope = $rootScope.$new();

    MockUserService = jasmine.createSpyObj('UserService', ['login']);
    MockUserService.login.andReturn(loginDeferred.promise);

    MockStateService = jasmine.createSpyObj('$state', ['go']);

    MockStateParamsService = {};

    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      $state: MockStateService,
      $stateParams: MockStateParamsService,
      UserService: MockUserService
    });

    scope.forms.login = { $invalid: true };
  }));

  it('should begin with empty credentials', function () {
    expect(scope.credentials).toEqual({});
  });

  it('should not call the login method if invalid credentials', function () {
    scope.forms.login.$invalid = true;
    scope.login();
    expect(MockUserService.login).not.toHaveBeenCalled();
  });

  it('should call login with credentials if valid', function () {
    scope.forms.login.$invalid = false;
    scope.login({ username: 'testuser', password: 'testpass' });
    expect(MockUserService.login).toHaveBeenCalledWith('testuser', 'testpass');
  });

  it('should publish an error if the login fails', function () {
    scope.forms.login.$invalid = false;
    scope.login({ username: 'testuser', password: 'testpass' });

    loginDeferred.reject();
    scope.$digest();

    expect(scope.error).toBe(true);
  });

  it('should go to the photos state by default if login success', function () {
    scope.forms.login.$invalid = false;
    scope.login({ username: 'testuser', password: 'testpass' });

    loginDeferred.resolve();
    scope.$digest();

    expect(MockStateService.go).toHaveBeenCalledWith('main.photos', {});
  });
});
