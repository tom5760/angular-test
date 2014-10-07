'use strict';

describe('login.LoginCtrl', function () {

  // Load the controller's module
  beforeEach(module('test.login'));

  var $rootScope,
      LoginCtrl;

  var loginDeferred;

  var MockStateService,
      MockStateParamsService,
      MockUserService;

  // Initialize the controller
  beforeEach(inject(function (_$rootScope_, $q, $controller) {
    $rootScope = _$rootScope_;

    loginDeferred = $q.defer();

    MockUserService = jasmine.createSpyObj('UserService', ['login']);
    MockUserService.login.andReturn(loginDeferred.promise);

    MockStateService = jasmine.createSpyObj('$state', ['go']);

    MockStateParamsService = {};

    LoginCtrl = $controller('LoginCtrl', {
      $state: MockStateService,
      $stateParams: MockStateParamsService,
      UserService: MockUserService
    });

    LoginCtrl.form = { $invalid: true };
  }));

  it('should begin with empty credentials', function () {
    expect(LoginCtrl.username).not.toBeDefined();
    expect(LoginCtrl.password).not.toBeDefined();
  });

  it('should not call the login method if invalid credentials', function () {
    LoginCtrl.form.$invalid = true;

    LoginCtrl.login();

    expect(MockUserService.login).not.toHaveBeenCalled();
  });

  it('should call login with credentials if valid', function () {
    LoginCtrl.form.$invalid = false;
    LoginCtrl.username = 'testuser';
    LoginCtrl.password = 'testpass';

    LoginCtrl.login();

    expect(MockUserService.login).toHaveBeenCalledWith('testuser', 'testpass');
  });

  it('should publish an error if the login fails', function () {
    LoginCtrl.form.$invalid = false;
    LoginCtrl.username = 'testuser';
    LoginCtrl.password = 'testpass';

    LoginCtrl.login();

    loginDeferred.reject();
    $rootScope.$digest();

    expect(LoginCtrl.error).toBe(true);
  });

  it('should go to the photos state by default if login success', function () {
    LoginCtrl.form.$invalid = false;
    LoginCtrl.username = 'testuser';
    LoginCtrl.password = 'testpass';
    LoginCtrl.login();

    loginDeferred.resolve();
    $rootScope.$digest();

    expect(MockStateService.go).toHaveBeenCalledWith('main.photos', {});
  });
});
