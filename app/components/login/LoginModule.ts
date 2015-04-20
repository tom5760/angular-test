/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

import en from 'components/login/en';

import LoginController from 'components/login/LoginController';

var login: ng.IModule = angular.module('test.login', [
    'pascalprecht.translate',
  ]);
export default login;

login.config(function ($translateProvider) {
  $translateProvider.translations('en', en);
});

login.controller('LoginController', LoginController);
