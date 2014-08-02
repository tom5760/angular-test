'use strict';

describe('util.stateToClassFilter', function () {

  // load the filter's module
  beforeEach(module('test.util'));

  // initialize a new instance of the filter before each test
  var stateToClass;
  beforeEach(inject(function ($filter) {
    stateToClass = $filter('stateToClass');
  }));

  it('should convert root states to CSS classes', function () {
    expect(stateToClass('foo')).toBe('state-foo');
    expect(stateToClass('bar')).toBe('state-bar');
  });

  it('should convert nested states to a list of classes', function () {
    expect(stateToClass('foo.bar')).toBe('state-foo state-foo-bar');
    expect(stateToClass('aaa.bbb.ccc')).toBe('state-aaa state-aaa-bbb state-aaa-bbb-ccc');
  });
});
