/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../../bower_components/DefinitelyTyped/angular-material/angular-material.d.ts" />
/// <reference path="../../../bower_components/DefinitelyTyped/angular-translate/angular-translate.d.ts" />

export default class ToastService {
  constructor(private $mdToast: angular.material.MDToastService,
              private $translate: angular.translate.ITranslateService) {}

  show(msg: string): ng.IPromise<any> {
    return this.$mdToast.show(this.$mdToast.simple().content(msg));
  }

  showKey(key: string): ng.IPromise<any> {
    return this.$translate(key).then(msg => this.show(msg));
  }
}
