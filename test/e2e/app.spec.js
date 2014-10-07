'use strict';

describe('App', function () {
  it('should redirect to the login page by default', function () {
    browser.get('/');
    expect(browser.getLocationAbsUrl()).toBe('/login');
  });
});
