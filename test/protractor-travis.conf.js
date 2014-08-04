// Protractor configuration
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

exports.config = {
  specs: ['e2e/**/*.js'],
  multiCapabilities: [{
    name: 'End-to-End Tests: Chrome 36',
    browserName: 'chrome',
    version: '36',
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY
    build: process.env.TRAVIS_BUILD_NUMBER,
    tags: ['CI']
  }, {
    name: 'End-to-End Tests: Firefox',
    browserName: 'firefox',
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY
    build: process.env.TRAVIS_BUILD_NUMBER,
    tags: ['CI']
  }, {
    name: 'End-to-End Tests: Safari',
    browserName: 'safari',
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY
    build: process.env.TRAVIS_BUILD_NUMBER,
    tags: ['CI']
  }, {
    name: 'End-to-End Tests: Internet Explorer 11',
    browserName: 'internet explorer',
    version: '11',
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY
    build: process.env.TRAVIS_BUILD_NUMBER,
    tags: ['CI']
  }]
};
