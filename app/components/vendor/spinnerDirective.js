/* global Spinner */
'use strict';

/**
 * spinner - Simple directive to show a busy spinner.
 *
 * Uses spin.js.  Available options documented at:
 *
 *    http://fgnass.github.io/spin.js/
 *
 * Can be used in a few ways:
 *
 * - as an element:
 *    <spinner></spinner>
 *
 * - as an attribute:
 *
 *    <div class="foo" spinner></div>
 *
 * The attribute form allows you to override spin.js parameters per-element:
 *
 *    <div spinner="{ lines: 5, speed: 10 }"></div>
 */
angular.module('test.vendor')
  .directive('spinner', function () {
    var defaults = {
      lines: 13,            // The number of lines to draw
      length: 20,           // The length of each line
      width: 10,            // The line thickness
      radius: 30,           // The radius of the inner circle
      corners: 1,           // Corner roundness (0..1)
      rotate: 0,            // The rotation offset
      direction: 1,         // 1: clockwise, -1: counterclockwise
      color: '#000',        // #rgb or #rrggbb or array of colors
      speed: 1,             // Rounds per second
      trail: 60,            // Afterglow percentage
      shadow: true,         // Whether to render a shadow
      hwaccel: false,       // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9,          // The z-index (defaults to 2000000000)
      top: '50%',           // Top position relative to parent
      left: '50%'           // Left position relative to parent
    };

    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        var spinner = null;

        attrs.$observe('spinner', function (value) {
          if (spinner !== null) {
            spinner.stop();
          }

          var overrides = scope.$eval(value);
          if (!angular.isObject(overrides)) {
            overrides = {};
          }

          var options = angular.copy(defaults);
          angular.extend(options, overrides);

          spinner = new Spinner(options).spin(element[0]);
        });

        element.on('$destroy', function () {
          spinner.stop();
        });
      }
    };
  });
