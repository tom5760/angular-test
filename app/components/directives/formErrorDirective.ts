/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />

angular.module('test.directives')
  .directive('formError', function () {
    return {
      restrict: 'E',
      require: '^form',
      replace: true,
      transclude: true,
      scope: {
        name: '@'
      },
      template: `
        <div ng-messages="form[name].$error" ng-show="form.$submitted || form[name].$dirty">

          <ng-transclude></ng-transclude>

          <div ng-message="required">This field is required.</div>
          <div ng-message="email">This field must be a valid email address.</div>
          <div ng-message="date">Date format should be YYYY-MM-DD</div>
          <div ng-message="minlength">This field must be longer.</div>
          <div ng-message="match">These fields must match.</div>
          <div ng-message="matchString">This field does not match.</div>
        </div>
      `,
      link: function (scope: ng.IScope,
                      element: ng.IAugmentedJQuery,
                      attrs: ng.IAttributes,
                      form: ng.IFormController) {
        /* tslint:disable:no-string-literal */
        scope['form'] = form;
        /* tslint:enable:no-string-literal */
      }
    };
  });
