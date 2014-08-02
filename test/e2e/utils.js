'use strict';

module.exports = {
  getLocation: function () {
    return browser.getLocationAbsUrl().then(function (url) {
      var hashIndex = url.indexOf('#');
      if (hashIndex === -1) {
        return '';
      }
      return url.slice(hashIndex + 1);
    });
  }
};
