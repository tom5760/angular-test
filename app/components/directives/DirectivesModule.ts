/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />

import busySpinnerDirective from './busySpinnerDirective';
import formErrorDirective from './formErrorDirective';
import formSubmitDirective from './formSubmitDirective';

var directives: ng.IModule = angular.module('test.directives', [
    'ngMessages'
  ]);
export default directives;

directives.directive('busySpinner', busySpinnerDirective);
directives.directive('formError', formErrorDirective);
directives.directive('formSubmit', formSubmitDirective);
