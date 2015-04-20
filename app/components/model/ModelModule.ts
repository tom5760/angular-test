/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

import UserService from 'components/model/UserService';

var model: ng.IModule = angular.module('test.model', []);
export default model;

model.service('UserService', UserService);
