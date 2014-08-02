'use strict';

/**
 * Directive to abstract away common input element template.
 *
 * @param model         Sets up a two-way binding between this and the
 *                      input's ng-model.
 * @param [validator]   An optional object specifying validations for this
 *                      input.
 * @param type          The input element's type.
 * @param label         The label for the input element.
 * @param [inputClass]  Optional CSS classes to add to the input element.
 * @param [placeholder] Optional text for the placeholder of the input
 *                      element.  If not specified, uses label.
 */
angular.module('test.form')
  .directive('formInput', function ($compile, ValidatorFactory) {

    var findInvalidChar = function (pattern, input) {
      var value = input.$viewValue;
      var lastChar = '';
      while (value.length > 0 && value.search(pattern) === -1) {
        lastChar = value.charAt(value.length - 1);
        value = value.substr(0, value.length - 1);
      }
      return lastChar;
    };

    return {
      restrict: 'E',
      require: '^form',
      scope: {
        model: '=',
        validator: '=?',
        name: '@',
        type: '@',
        label: '@',
        inputClass: '@',
        placeholder: '@'
      },
      templateUrl: function (element, attrs) {
        switch (attrs.type) {
          case 'checkbox':
            return 'components/form/formCheckbox.html';

          case 'button': // intentional fallthrough
          case 'submit':
            return 'components/form/formButton.html';

          default:
            return 'components/form/formInput.html';
        }
      },
      link: function (scope, element, attrs, FormController) {

        var updateValidators = function () {
          scope.finalValidator = ValidatorFactory.merge(
              scope.name, FormController.$lsValidators, scope.validator);
        };

        scope.form = FormController;
        scope.findInvalidChar = findInvalidChar;

        // Use the label as placeholder if none is specified.
        if (angular.isString(scope.placeholder)) {
          scope.placeholderID = scope.placeholder;
        } else {
          scope.placeholderID = scope.label;
        }

        updateValidators();
        ValidatorFactory.build(element.find('input'), scope,
            'name', 'finalValidator');

        // Watch for changes in either validator, and re-merge them if changed.
        scope.$watch('validator', updateValidators, true);
        scope.$watch(function () {
          return FormController.$lsValidators;
        }, updateValidators, true);
      }
    };
  });
