/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />

import en from './en';
import LoginController from './LoginController';

var login: ng.IModule = angular.module('test.login', [
    'pascalprecht.translate',
  ]);
export default login;

login.config(function ($translateProvider) {
  $translateProvider.translations('en', en);
});

login.controller('LoginController', LoginController);
