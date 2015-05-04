/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />

import UserService from './UserService';

var model: ng.IModule = angular.module('test.model', []);
export default model;

model.service('UserService', UserService);
