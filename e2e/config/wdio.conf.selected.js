/**
 *
 * wdio.conf.iOSSim.js
 * Test configuration file used for iOS test environment
 * It uses Chome with Google Nexus 5 mobileEmulation
 *
 */
const fs = require('fs');

const merge = require('deepmerge');

const wdioConfChrome = require('./wdio.conf.drivers.js');

const fileName = [];

const testFolders = [

  `./e2e/cucumber/features/${PLATFORM_NAME}/healthCheck/`,
];

testFolders.forEach(testFolder => {
  const files = fs.readdirSync(testFolder);
  files.forEach(file => {
    file = testFolder + file;
    fileName.push(file);
  });
});

const getSelectedTextCases = function() {
  const tickets = (process.env.FEATURE || '').split(',');
  const feature = fileName;
  const production = [
    'healthCheck'
  ];
  let ticketToTest = [];
  let testFilter;
  if (tickets.find(testSuite => production.includes(testSuite))) {
    tickets.forEach(ticket => {
      ticketToTest = ticketToTest.concat(
        (production.includes(ticket) && wdioConfChrome.config.suites[ticket]) ||
        []
      );
    });
  } else if (tickets.length > 0) {
    tickets.forEach(ticket => {
      if (
        ticket.indexOf('TC_Checkout_') === -1 &&
        ticket.indexOf('TC_Search_') === -1
      ) {
        testFilter = tc =>
          tc.indexOf(`TC_Add2Cart_${ticket}-`) !== -1 ||
          tc.indexOf(`TC_Search${ticket}-`) !== -1 ||
          tc.indexOf(`TC_Checkout_${ticket}-`) !== -1 ||
          tc.indexOf(`TC_Member${ticket}-`) !== -1 ||
          tc.indexOf(`TC_Membership${ticket}-`) !== -1;
      } else {
        testFilter = tc => tc.indexOf(`${ticket}-`) !== -1;
      }
      ticketToTest = ticketToTest.concat(feature.filter(testFilter));
      ticketToTest = ticketToTest.filter(
        (data, index, array) => array.indexOf(data) === index
      );
    });
  }
  return ticketToTest;
};

const wdioSelectedConfig = merge(wdioConfChrome.config, {
  suites: {
    feature: getSelectedTextCases()
  }
});

exports.config = wdioSelectedConfig;