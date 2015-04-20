/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

import en from 'components/utils/en';

import SiteTitleService from 'components/utils/SiteTitleService';
import ToastService from 'components/utils/ToastService';

var utils: ng.IModule = angular.module('test.utils', [
    'pascalprecht.translate',
  ]);
export default utils;

utils.config(function ($translateProvider) {
  $translateProvider.translations('en', en);
});

utils.service('SiteTitleService', SiteTitleService);
utils.service('ToastService', ToastService);
