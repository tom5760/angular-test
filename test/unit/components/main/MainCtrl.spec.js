'use strict';

describe('main.MainCtrl', function () {

  // Load the controller's module
  beforeEach(module('test.main'));

  var MainCtrl;
  var MockUserService;

  // Initialize the controller
  beforeEach(inject(function ($controller) {
    MockUserService = {};

    MainCtrl = $controller('MainCtrl', {
      UserService: MockUserService
    });
  }));

  it('should store UserService on the instance', function () {
    expect(MainCtrl.UserService).toBe(MockUserService);
  });

  it('should default the main nav to collapsed', function () {
    expect(MainCtrl.isMainNavCollapsed).toBe(true);
  });
});
