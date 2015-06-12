/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />

angular.module('test.login')
  .config(function ($translateProvider) {
    $translateProvider.translations('en', {
      LOGIN: {
        TITLE: 'Log In',
        EMAIL: 'Email',
        PASSWORD: 'Password',
        SUBMIT: 'Log In'
      }
    });
  });
