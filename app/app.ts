/// <reference path="../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/angular-translate/angular-translate.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/angular-ui-router/angular-ui-router.d.ts" />

angular.module('test.app', [
    'ngMaterial',
    'pascalprecht.translate',
    'ui.router',

    'test.login',
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
      .fallbackLanguage('en')
      .translations('en', {
        SITE_TITLE: 'Test App'
      });
  })

  .config(function ($urlRouterProvider: angular.ui.IUrlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');
  })

  .config(function ($stateProvider: angular.ui.IStateProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        controller: 'LoginController',
        controllerAs: 'login',
        templateUrl: 'components/login/login.html',
        data: {
          title: 'LOGIN.TITLE'
        }
      })
    ;
  })

  .run(function (SiteTitleService: SiteTitleService) {
    angular.forEach(arguments, function (service) {
      service.listen();
    });
  })
;
