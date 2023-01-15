/* eslint-disable import/no-dynamic-require */
/**
 *
 * wdio.conf.chrome.js
 * Test configuration file used for iOS test environment
 * It uses Chrome with iPhone 6 mobileEmulation
 *
 */
const { join } = require('path');
const merge = require('deepmerge');
const fs = require('fs');
const chai = require('chai');
global.expect = chai.expect;
global.assert = chai.assert;

const wdioConfBase = require('./wdio.conf.base.js');
let browsers = process.env.EXECUTOR;
browsers = browsers.split(',');
global.constants = require(`../data/constants.js`);
const browserCapabilities = [];

browsers.forEach(element => {
  if (element === 'Android') {
    browserCapabilities.push({
      platformName: 'Android',
      maxInstances: 1,
      orientation: 'PORTRAIT',
      appActivity: '.MainActivity',
      appPackage: 'com.swaglabsmobileapp',
      'appium:deviceName': process.env.DEVICE_NAME,
      'appium:platformVersion': process.env.PLATFORM_VERSION,
      'appium:orientation': 'PORTRAIT',
      'appium:automationName': 'UiAutomator2',
      'appium:noReset': false,
      'appium:newCommandTimeout': 240,
      browserName: '',
    });
  }

  if (element === 'iOS') {
    browserCapabilities.push({
      deviceName: process.env.DEVICE_NAME,
      bundleId: "demoappdemoapp",
      platformName: process.env.PLATFORM_NAME,
      "udid": process.env.UDID,
      "automationName": "XCUITest",
      platformVersion: process.env.PLATFORM_VERSION,
      //  fullReset: true, //uninstall app
      //  app: 'process.cwd() + '/apps/app-preproduction-JP-nightly.apk',
    });
  }
});

exports.config = merge(wdioConfBase.config, {
  /**
   ============
   Capabilities
   ============
   Define your capabilities here. WebdriverIO can run multiple capabilities at the same
   time. Depending on the number of capabilities, WebdriverIO launches several test
   sessions. Within your capabilities you can overwrite the spec and exclude options in
   order to group specific specs to a specific capability.
   */

  capabilities: browserCapabilities,

  host: process.env.GRIDHOST || 'localhost',
  port: process.env.GRIDPORT || 4723,
  path: '/wd/hub',
  protocol: 'http',
  maxInstances: process.env.instance || 1,

  /**
   Gets executed before test execution begins. At this point you can access all global
   variables, such as `browser`. It is the perfect place to define custom commands.
   */
  before: function(capabilities, specs) {
    /**
     * Setup the Chai assertion framework
     */
    browser.params = this.params || {};
    browser.params.windowsCount = 0;
    const customCommands = require('../utilities/functions/customCommands.js');
    customCommands.init();
    const contents = fs.readFileSync(specs[0], 'utf8');
    console.log('Starting Test Case: -', specs[0].replace(/^.*[\\\/]/, '')); // eslint-disable-line no-useless-escape
    this.params = [];
    browser.params = this.params;
    browser.setNetworkConnection(6);
  }
});
