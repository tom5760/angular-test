/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />

import SiteTitleService from '../utils/SiteTitleService';
import ToastService from '../utils/ToastService';
import UserService from '../model/UserService';

export default class LoginController {

  email: string;
  password: string;
  form: ng.IFormController;

  busy: boolean = false;

  constructor(private SiteTitleService: SiteTitleService,
              private ToastService: ToastService,
              private UserService: UserService) {}

  activate() {
    this.SiteTitleService.setTitleKey('LOGIN.TITLE');
  }

  clearForm() {
    delete this.email;
    delete this.password;

    this.form.$setPristine();
    this.form.$setUntouched();
    this.busy = false;
  }

  submit() {
    console.log('Log in', this.email);

    this.busy = true;
    this.UserService.login(this.email, this.password)
      .then(() => this.onLoginSuccess(), (err) => this.onLoginError(err))
      .finally(() => this.clearForm())
  }

  private onLoginSuccess() {
    console.log('LOGIN SUCCESS');
  }

  private onLoginError(err) {
    this.ToastService.showKey(err);
  }
}
