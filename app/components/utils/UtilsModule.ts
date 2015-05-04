/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />

import en from './en';

import SiteTitleService from './SiteTitleService';
import ToastService from './ToastService';

var utils: ng.IModule = angular.module('test.utils', [
    'pascalprecht.translate',
  ]);
export default utils;

utils.config(function ($translateProvider) {
  $translateProvider.translations('en', en);
});

utils.service('SiteTitleService', SiteTitleService);
utils.service('ToastService', ToastService);
