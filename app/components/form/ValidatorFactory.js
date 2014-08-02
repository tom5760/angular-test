'use strict';

angular.module('test.form')
  .factory('ValidatorFactory', function ($compile) {
    return {
      /** Merges validator objects together, with wildcards. */
      merge: function (name, global, local) {
        var mergedValidators = {};

        if (angular.isObject(global['*'])) {
          angular.extend(mergedValidators, global['*']);
        }

        if (angular.isObject(global[name])) {
          angular.extend(mergedValidators, global[name]);
        }

        if (angular.isObject(local)) {
          angular.extend(mergedValidators, local);
        }

        return mergedValidators;
      },

      /**
       * Dynamically add validation attributes on to the input element.
       *
       * We don't want to do this in the main template, since we don't want to
       * specify every possible validator.  We need to do it here because we
       * need to run the generated input template through the compiler.
       */
      build: function (element, scope, nameProp, validatorProp) {
        var name = scope[nameProp];
        var validator = scope[validatorProp];

        // We have to do this since id and name are not bindable in angular.
        element.attr('id', name);
        element.attr('name', name);

        // Add directives for each validation assigned
        if (angular.isDefined(validator.required)){
          element.attr('ng-required', validatorProp + '.required');
        }

        if (angular.isDefined(validator.minlength)) {
          element.attr('ng-minlength', validatorProp + '.minlength');
        }

        if (angular.isDefined(validator.maxlength)) {
          element.attr('ng-maxlength', validatorProp + '.maxlength');

          // Also attach the normal html "maxlength" parameter, to just
          // prevent the user from typing more than the max.
          element.attr('maxlength', validator.maxlength);
        }

        if (angular.isDefined(validator.pattern)) {
          element.attr('ng-pattern', validatorProp + '.pattern');
        }

        if (angular.isDefined(validator.disabled)) {
          element.attr('ng-disabled', validatorProp + '.disabled');
        }

        $compile(element)(scope);
      }
    };
  });
