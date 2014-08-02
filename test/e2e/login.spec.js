'use strict';

var LoginPage = require('./pages/LoginPage.js');
var utils = require('./utils.js');

describe('Login Page', function () {
  var loginPage;

  beforeEach(function () {
    loginPage = new LoginPage();
    loginPage.get();
  });

  it('should say username and password are required if form is empty', function () {
    loginPage.login();

    loginPage.getFormErrors().then(function (items) {
      expect(items.length).toBe(2);
      expect(items[0].getText()).toBe('User Name is required.');
      expect(items[1].getText()).toBe('Password is required.');
    });
  });

  it('should say password required if only username is filled', function () {
    loginPage.setUsername('test');
    loginPage.login();

    loginPage.getFormErrors().then(function (items) {
      expect(items.length).toBe(1);
      expect(items[0].getText()).toBe('Password is required.');
    });
  });

  it('should say username required if only the password is filled', function () {
    loginPage.setPassword('test');
    loginPage.login();

    loginPage.getFormErrors().then(function (items) {
      expect(items.length).toBe(1);
      expect(items[0].getText()).toBe('User Name is required.');
    });
  });

  it('should fail login with username of "bad"', function () {
    loginPage.setUsername('bad');
    loginPage.setPassword('asdf');
    loginPage.login();

    expect(loginPage.getLoginError()).toBe('Login failed');
  });

  it('should fail login with password of "bad"', function () {
    loginPage.setUsername('asdf');
    loginPage.setPassword('bad');
    loginPage.login();

    expect(loginPage.getLoginError()).toBe('Login failed');
  });

  it('should go to the photos page with any other username/password', function () {
    loginPage.setUsername('asdf');
    loginPage.setPassword('asdf');
    loginPage.login();

    expect(utils.getLocation()).toBe('/photos');
  });

  it('should go to the about page next is specified', function () {
    loginPage.get('main.about');

    loginPage.setUsername('asdf');
    loginPage.setPassword('asdf');
    loginPage.login();

    expect(utils.getLocation()).toBe('/about');
  });
});
