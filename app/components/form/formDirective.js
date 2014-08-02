'use strict';

/**
 * Directive to augment forms with some common functionality.
 *
 * Marks each control as touched when a form is submitted.  This allows form
 * errors to show when clicking submit of a pristine form.
 *
 * Also, allows for attaching form-wide validator objects.  The format of this
 * object is keyed by the "name" values of each input field.  A generic "*"
 * property can be specified to provide common validators for the whole form.
 */
angular.module('test.form')
  .directive('form', function () {
    return {
      restrict: 'E',
      require: 'form',
      scope: {
        validators: '=?'
      },
      link: function (scope, element, attrs, FormController) {
        var onSubmit = function () {
          scope.$apply(function () {
            angular.forEach(FormController, function (value) {
              if (value.hasOwnProperty('$setTouched')) {
                value.$setTouched();
              }
            });
          });
        };

        element.on('submit', onSubmit);
        element.on('$destroy', function () {
          element.off('submit', onSubmit);
        });

        // Bind the form-wide validator to the form controller.
        if (angular.isDefined(scope.validators)) {
          FormController.$lsValidators = scope.validators;
        }
      }
    };
  });
