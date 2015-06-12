/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../../node_modules/DefinitelyTyped/angular-translate/angular-translate.d.ts" />
/// <reference path="../../../node_modules/DefinitelyTyped/angular-ui-router/angular-ui-router.d.ts" />

class SiteTitleService {
    constructor(private $rootScope: ng.IRootScopeService,
                private $translate: angular.translate.ITranslateService) {}

    setTitleKey(key: string) {
      this.setTitle(this.$translate.instant(key));
    }

    setTitle(title: string) {
      var t = this.$translate.instant(title),
          pageTitle = this.$translate.instant('SITE_TITLE');

      /* tslint:disable:no-string-literal */
      this.$rootScope['siteTitle'] = `${t} : ${pageTitle}`;
      /* tslint:enable:no-string-literal */
    }

    listen() {
      this.$rootScope
        .$on('$stateChangeSuccess', this.onStateChangeSuccess.bind(this));
    }

    private onStateChangeSuccess(evt, toState: angular.ui.IState) {
      if ('title' in toState.data) {
        this.setTitle(toState.data.title);
      }
    }
  }

angular.module('test.utils').service('SiteTitleService', SiteTitleService);
