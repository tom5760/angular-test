/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />

angular.module('test.directives')
  .directive('busySpinner', function () {
    return {
      restrict: 'E',
      template: `
        <div class="busy-spinner" layout="column" layout-fill layout-align="center center">
          <md-progress-circular md-mode="indeterminate"></md-progress-circular>
        </div>
      `
    };
  });
