/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />

import ToastService from '../utils/ToastService';

/**
 * Provides a form-submit attribute directive, which executes an expression
 * only when the form is valid.
 */
export default function formSubmitDirective(ToastService: ToastService): ng.IDirective {

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
            scope.$eval(attrs['formSubmit']);
          } else {
            ToastService.showKey('ERRORS.FORM_INVALID');
          }
        });
      });

    }
  };

}
