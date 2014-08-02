// Protractor configuration
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

exports.config = {
  specs: ['e2e/**/*.js'],
  multiCapabilities: [{
    name: 'End-to-End Tests: Chrome 36',
    browserName: 'chrome',
    version: '36',
    'tunnel-identifier': process.env.USER
  }, {
    name: 'End-to-End Tests: Firefox',
    browserName: 'firefox',
    'tunnel-identifier': process.env.USER
  }, {
    name: 'End-to-End Tests: Safari',
    browserName: 'safari',
    'tunnel-identifier': process.env.USER
  }, {
    name: 'End-to-End Tests: Internet Explorer 11',
    browserName: 'internet explorer',
    version: '11',
    'tunnel-identifier': process.env.USER
  }, {
    name: 'End-to-End Tests: Internet Explorer 9',
    browserName: 'internet explorer',
    version: '9',
    'tunnel-identifier': process.env.USER
  }],

  getPageTimeout: 90000,

  jasmineNodeOpts: {
    defaultTimeoutInterval: 90000
  }
};
