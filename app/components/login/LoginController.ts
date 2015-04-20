/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

export default class LoginController {

  email: string;
  password: string;
  busy: boolean;
  form: ng.IFormController;

  constructor() {}

  clearForm() {
    this.password = null;
    this.form.$setPristine();
  }

  submit() {
    console.log('Log in', this.email, this.password);
    this.busy = true;
    this.clearForm();
  }
}
