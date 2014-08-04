// Protractor configuration
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

exports.config = {
  specs: ['e2e/**/*.js'],

  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  multiCapabilities: [{
    name: 'End-to-End Tests: Chrome 36',
    browserName: 'chrome',
    version: '36',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER,
    tags: ['CI']
  }, {
    name: 'End-to-End Tests: Firefox',
    browserName: 'firefox',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER,
    tags: ['CI']
  }, {
    name: 'End-to-End Tests: Safari',
    browserName: 'safari',
    platform: 'OS X 10.9',
    version: '7',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER,
    tags: ['CI']
  }]
};
