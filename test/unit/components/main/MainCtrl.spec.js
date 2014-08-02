'use strict';

describe('main.MainCtrl', function () {

  // Load the controller's module
  beforeEach(module('test.main'));

  var MainCtrl;
  var scope;
  var MockUserService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    MockUserService = {};

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      UserService: MockUserService
    });
  }));

  it('should store UserService on the scope', function () {
    expect(scope.UserService).toBe(MockUserService);
  });

  it('should default the main nav to collapsed', function () {
    expect(scope.isMainNavCollapsed).toBe(true);
  });

  it('should be able to toggle the main nav', function () {
    scope.isMainNavCollapsed = false;
    scope.setMainNavState();
    expect(scope.isMainNavCollapsed).toBe(true);

    scope.setMainNavState();
    expect(scope.isMainNavCollapsed).toBe(false);
  });

  it('should be able to explicitly set the main nav state', function () {
    scope.isMainNavCollapsed = false;

    scope.setMainNavState(true);
    expect(scope.isMainNavCollapsed).toBe(true);

    scope.setMainNavState(true);
    expect(scope.isMainNavCollapsed).toBe(true);

    scope.setMainNavState(false);
    expect(scope.isMainNavCollapsed).toBe(false);

    scope.setMainNavState(false);
    expect(scope.isMainNavCollapsed).toBe(false);
  });
});
