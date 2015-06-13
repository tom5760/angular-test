/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />

angular.module('test.main')
  .config(function ($translateProvider) {
    $translateProvider.translations('en', {
      MAIN: {
        TITLE: 'Main'
      }
    });
  });
