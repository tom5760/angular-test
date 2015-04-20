'use strict';

angular.module('test.util')
  .filter('stateToClass', function () {
    return function (input) {
      var states = input.split('.');
      var curState = '';
      var classes = [];
      for (var i = 0; i < states.length; i++) {
        curState = curState += states[i];
        classes.push('state-' + curState);
        curState += '-';
      }
      return classes.join(' ');
    };
  });
