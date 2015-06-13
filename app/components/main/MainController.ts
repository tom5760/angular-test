/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />

class MainController {
  constructor(private SiteTitleService: SiteTitleService,
              private ToastService: ToastService,
              private UserService: UserService) {}
}

angular.module('test.main')
  .controller('MainController', MainController);
