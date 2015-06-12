/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />

/**
 * Provides a form-submit attribute directive, which executes an expression
 * only when the form is valid.
 */
angular.module('test.directives')
  .directive('formSubmit', function (ToastService) {
    return {
      restrict: 'A',
      require: 'form',
      link: function (scope: ng.IScope,
                      element: ng.IAugmentedJQuery,
                      attrs: ng.IAttributes,
                      form: ng.IFormController) {

        // Disable the browser's built-in validators.
        element.attr('novalidate', '');

        element.on('submit', function () {
          scope.$apply(function () {
            if (form.$valid) {
              /* tslint:disable:no-string-literal */
              scope.$eval(attrs['formSubmit']);
              /* tslint:enable:no-string-literal */
            } else {
              ToastService.showKey('ERRORS.FORM_INVALID');
            }
          });
        });

      }
    };
  });
