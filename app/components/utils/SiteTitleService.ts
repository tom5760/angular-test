/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../../node_modules/DefinitelyTyped/angular-translate/angular-translate.d.ts" />

export default class SiteTitleService {
  constructor(private $rootScope: ng.IRootScopeService,
              private $translate: angular.translate.ITranslateService) {}

  setTitleKey(key: string) {
    return this.$translate(key).then(title => this.setTitle(title));
  }

  setTitle(title: string) {
    this.$rootScope['siteTitle'] = `${title} : Test App`;
  }
}
