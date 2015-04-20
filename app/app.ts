/// <reference path="../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../bower_components/DefinitelyTyped/angular-translate/angular-translate.d.ts" />

import directives from 'components/directives/DirectivesModule';
import login from 'components/login/LoginModule';

class AppController {
  constructor($router) {
    $router.config([{
      path: '/',
      redirectTo: 'login'
    }, {
      path: '/login',
      component: 'login'
    }]);
  }
}

export default angular.module('test.app', [
    'ngMaterial',
    'ngNewRouter',

    'pascalprecht.translate',

    directives.name,
    login.name
  ])

  .config(function (
        $compileProvider: ng.ICompileProvider,
        $logProvider: ng.ILogProvider) {
    $compileProvider.debugInfoEnabled(true);
    $logProvider.debugEnabled(true);
  })

  .config(function ($translateProvider: angular.translate.ITranslateProvider) {
    $translateProvider
      .useSanitizeValueStrategy('escaped')
      .determinePreferredLanguage()
      .fallbackLanguage('en');
  })

  .controller('AppController', AppController);
