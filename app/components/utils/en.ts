angular.module('test.utils')
  .config(function ($translateProvider) {
    $translateProvider.translations('en', {
      ERRORS: {
        FORM_INVALID: 'Please fix the errors in the form.',
        CREDENTIALS: 'Invalid credentials.'
      }
    });
  });
