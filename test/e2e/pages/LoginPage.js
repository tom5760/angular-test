/**
 * Login Page Object
 *
 * https://github.com/angular/protractor/blob/master/docs/page-objects.md
 */
module.exports = function LoginPage() {
  this.usernameInput = element(by.css('input[name=username]'));
  this.passwordInput = element(by.css('input[name=password]'));
  this.loginButton = element(by.buttonText('Log In'));

  this.get = function (next) {
    var query = '';

    if (typeof(next) === 'string') {
      query += '?next=' + next;
    }

    browser.get('/#/login' + query);
  };

  this.getUsername = function () {
    this.usernameInput.getAttribute('value');
  };

  this.setUsername = function (username) {
    this.usernameInput.sendKeys(username);
  };

  this.getPassword = function () {
    this.passwordInput.getAttribute('value');
  };

  this.setPassword = function (password) {
    this.passwordInput.sendKeys(password);
  };

  this.login = function () {
    this.loginButton.click();
  };

  this.getFormErrors = function () {
    return element.all(by.css('.help-block'));
  };

  this.getLoginError = function () {
    return element(by.css('.alert.alert-danger')).getText();
  };
};
