/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

import LoginController from 'components/login/LoginController';

var login: ng.IModule = angular.module('test.login', []);
export default login;

login.controller('LoginController', LoginController);
