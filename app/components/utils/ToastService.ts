/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../../node_modules/DefinitelyTyped/angular-material/angular-material.d.ts" />
/// <reference path="../../../node_modules/DefinitelyTyped/angular-translate/angular-translate.d.ts" />

export default class ToastService {
  constructor(private $mdToast: angular.material.MDToastService,
              private $translate: angular.translate.ITranslateService) {}

  show(msg: string): ng.IPromise<any> {
    var toast = this.$mdToast
      .simple()
      .position('top right')
      .content(msg);

    return this.$mdToast.show(toast);
  }

  showKey(key: string): ng.IPromise<any> {
    return this.$translate(key).then(msg => this.show(msg));
  }
}
