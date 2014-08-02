'use strict';

describe('util.RouteCheckerService', function () {

  // Load the service's module
  beforeEach(module('test.util'));

  var RouteCheckerService;
  var MockStateService;
  var MockUserService;
  var MockEvent;

  // Load mocks
  beforeEach(function () {
    module(function ($provide) {

      MockStateService = jasmine.createSpyObj('$state', ['go']);
      MockUserService = jasmine.createSpyObj('UserService', ['isAuthenticated']);
      MockEvent = jasmine.createSpyObj('event', ['preventDefault']);

      $provide.value('$state', MockStateService);
      $provide.value('UserService', MockUserService);
    });
  });

  // Instantiate service
  beforeEach(inject(function (_RouteCheckerService_) {
    RouteCheckerService = _RouteCheckerService_;
  }));

  it('should allow non-logged-in users to non-main states', function () {
    MockUserService.isAuthenticated.andReturn(false);
    RouteCheckerService(MockEvent, { name: 'login' });

    expect(MockEvent.preventDefault).not.toHaveBeenCalled();
    expect(MockStateService.go).not.toHaveBeenCalled();
  });

  it('should allow logged-in users to non-main states', function () {
    MockUserService.isAuthenticated.andReturn(true);
    RouteCheckerService(MockEvent, { name: 'login' });

    expect(MockEvent.preventDefault).not.toHaveBeenCalled();
    expect(MockStateService.go).not.toHaveBeenCalled();
  });

  it('should not allow non-logged-in users to main state', function () {
    MockUserService.isAuthenticated.andReturn(false);
    RouteCheckerService(MockEvent, { name: 'main' }, {});

    expect(MockEvent.preventDefault).toHaveBeenCalled();
    expect(MockStateService.go).toHaveBeenCalled();
  });

  it('should not allow non-logged-in users to main child states', function () {
    MockUserService.isAuthenticated.andReturn(false);
    RouteCheckerService(MockEvent, { name: 'main.asdf' }, {});

    expect(MockEvent.preventDefault).toHaveBeenCalled();
    expect(MockStateService.go).toHaveBeenCalled();
  });

  it('should preserve the next state when redirecting', function () {
    MockUserService.isAuthenticated.andReturn(false);
    RouteCheckerService(MockEvent, { name: 'main.asdf' }, {});

    expect(MockStateService.go).toHaveBeenCalledWith('login', {
      next: 'main.asdf'
    });
  });

  it('should preserve the next state params when redirecting', function () {
    MockUserService.isAuthenticated.andReturn(false);
    RouteCheckerService(MockEvent, { name: 'main.asdf' }, { foo: 'bar' });

    expect(MockStateService.go).toHaveBeenCalledWith('login', {
      next: 'main.asdf',
      params: '{"foo":"bar"}'
    });
  });
});
