/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../../bower_components/DefinitelyTyped/angular-material/angular-material.d.ts" />

/**
 * Provides a form-submit attribute directive, which executes an expression
 * only when the form is valid.
 */
export default function formSubmitDirective($mdToast: angular.material.MDToastService): ng.IDirective {
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
            $mdToast.show($mdToast.simple()
              .content('Please fix the errors in the form.'));
          }
        });
      });
    }
  };
}
