'use strict';

/**
 * Main module of the application.
 */
angular.module('test.app', [
    'ngAnimate',
    'ngMessages',
    'ngTouch',

    'pascalprecht.translate',

    'ui.router',

    'test.config',

    'test.login',
    'test.main',
    'test.model',
    'test.photos',
    'test.translation',
    'test.util'
  ])

  /** Configure whether to output debugging information to console. */
  .config(function ($logProvider, config) {
    $logProvider.debugEnabled(config.DEBUG);
  })

  /** Set up our app translations. */
  .config(function ($translateProvider) {
    $translateProvider
      .useSanitizeValueStrategy('escaped')
      .determinePreferredLanguage()
      .fallbackLanguage('en');
  })

  /** Configure application routes. */
  .config(function ($urlRouterProvider, $stateProvider) {
    // For any unmatched URL redirect to /
    $urlRouterProvider.otherwise('/login');

    // Set up our application states
    $stateProvider
      .state('login', {
        url: '/login?next&params',
        templateUrl: 'components/login/login.html',
        controller: 'LoginCtrl',
        data: { title: 'LOGIN.TITLE' }
      })
      .state('main', {
        abstract: true,
        templateUrl: 'components/main/main.html',
        controller: 'MainCtrl'
      })
      .state('main.photos', {
        url: '/photos',
        templateUrl: 'components/photos/photos.html',
        controller: 'PhotoCtrl',
        data: { title: 'PHOTOS.TITLE' }
      })
      .state('main.photos.single', {
        url: '/:id',
        data: { title: 'PHOTOS.TITLE' }
      })
      .state('main.about', {
        url: '/about',
        template: '<p>Hello!</p>',
        data: { title: 'About.TITLE' }
      })
    ;
  })

  /** Log our version information to the console. */
  .run(function ($log, build) {
    $log.info('Test App Version:', build.version,
        'Commit:', build.commit, 'Env:', build.env);
  })

  /**
   * https://github.com/angular-ui/ui-router/wiki/Quick-Reference#note-about-using-state-within-a-template
   *
   * It's very handy to add references to $state and $stateParams to the
   * $rootScope so that you can access them from any scope within your
   * applications.
   *
   * This can probably be removed once ui-router releases a new version which
   * will fix ui-sref-active handling child states.
   */
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })

  /** Set up service to check logged in state for route changes. */
  .run(function ($rootScope, RouteCheckerService) {
    $rootScope.$on('$stateChangeStart', RouteCheckerService);
  })
;
