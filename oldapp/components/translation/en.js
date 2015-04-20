'use strict';

/**
 * English translations.
 */
angular.module('test.translation')
  .config(function ($translateProvider) {
    $translateProvider.translations('en', {
      SITE_TITLE: 'Test App',

      LOGIN: {
        TITLE: 'Log In',
        USERNAME: 'User Name',
        PASSWORD: 'Password',
        REMEMBER_ME: 'Remember Me',
        LOGIN: 'Log In',
        ERROR: 'Login failed',
        HELP: 'Use any username/password to log in.  Use username "bad" to test failed login.'
      },

      FORMS: {
        INVALID_REQUIRED: '{{ ::label | translate }} is required.',
        INVALID_MINLENGTH: '{{ ::label | translate }} must be at least {{ minlength }} characters.',
        INVALID_MAXLENGTH: '{{ ::label | translate }} ust be at most {{ maxlength }} characters.',
        INVALID_PATTERN: '{{ ::label | translate }} cannot contain <kbd>{{ char }}</kbd>.',
        INVALID_EMAIL: '{{ ::label | translate }} is not a valid email address.'
      },

      MAIN: {
        LOGGED_IN: 'Logged in as {{ user }}',
        LOG_OUT: 'Log Out'
      },

      PHOTOS: {
        TITLE: 'Photos'
      },

      ABOUT: {
        TITLE: 'About'
      }
    });
  });
