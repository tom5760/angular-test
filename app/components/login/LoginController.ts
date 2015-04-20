/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

import SiteTitleService from 'components/utils/SiteTitleService';

export default class LoginController {

  email: string;
  password: string;
  busy: boolean;
  form: ng.IFormController;

  constructor(private SiteTitleService: SiteTitleService) {}

  clearForm() {
    this.password = null;
    this.form.$setPristine();
  }

  submit() {
    console.log('Log in', this.email, this.password);
    this.busy = true;
    this.clearForm();
  }

  activate() {
    this.SiteTitleService.setTitleKey('LOGIN.TITLE');
  }

}
