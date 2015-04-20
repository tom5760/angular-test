/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

import busySpinnerDirective from 'components/directives/busySpinnerDirective';
import formErrorDirective from 'components/directives/formErrorDirective';
import formSubmitDirective from 'components/directives/formSubmitDirective';

var directives: ng.IModule = angular.module('test.directives', [
    'ngMessages'
]);
export default directives;

directives.directive('busySpinner', busySpinnerDirective);
directives.directive('formError', formErrorDirective);
directives.directive('formSubmit', formSubmitDirective);
