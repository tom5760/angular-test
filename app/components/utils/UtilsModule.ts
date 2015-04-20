/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

import SiteTitleService from 'components/utils/SiteTitleService';

var utils: ng.IModule = angular.module('test.utils', []);
export default utils;

utils.service('SiteTitleService', SiteTitleService);
