/// <reference path="../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/angular-translate/angular-translate.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/angular-ui-router/angular-ui-router.d.ts" />

angular.module('test.app', [
    'ngMaterial',
    'pascalprecht.translate',
    'ui.router',

    'test.login',
    'test.main',
  ])

  .config(function (
        $compileProvider: ng.ICompileProvider,
        $logProvider: ng.ILogProvider) {
    $compileProvider.debugInfoEnabled(true);
    $logProvider.debugEnabled(true);
  })

  .config(function ($locationProvider: ng.ILocationProvider) {
    $locationProvider.html5Mode(true);
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
      .otherwise('/login');
  })

  .config(function ($stateProvider: angular.ui.IStateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        controllerAs: 'login',
        templateUrl: 'login/login.html',
        data: {
          title: 'LOGIN.TITLE'
        }
      })
      .state('main', {
        url: '/main',
        controller: 'MainController',
        controllerAs: 'main',
        templateUrl: 'main/main.html',
        data: {
          title: 'MAIN.TITLE'
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
