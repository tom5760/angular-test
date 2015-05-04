/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />

export default function busySpinnerDirective(): ng.IDirective {
  return {
    restrict: 'E',
    template: `
      <div class="busy-spinner" layout="column" layout-fill layout-align="center center">
        <md-progress-circular md-mode="indeterminate"></md-progress-circular>
      </div>
    `
  };
}
