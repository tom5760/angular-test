/// <reference path="../../../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />

class LoginController {
  email: string;
  password: string;
  form: ng.IFormController;

  busy: boolean = false;

  constructor(private SiteTitleService: SiteTitleService,
              private ToastService: ToastService,
              private UserService: UserService) {}

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
      .finally(() => this.clearForm());
  }

  private onLoginSuccess() {
    console.log('LOGIN SUCCESS');
  }

  private onLoginError(err) {
    this.ToastService.showKey(err);
  }
}

angular.module('test.login')
  .controller('LoginController', LoginController);