/*
 Utility function
 */
const utilities = require('./utilities');
const cucumberJson = require("wdio-cucumberjs-json-reporter").default;


const customCommands = {

  /**
   * Custom browser command to validate that
   * current URL contains an expected path
   * @param {String} expectedPath
   */
  urlValidation: function urlValidation(expectedPath) {
    let i = 0;
    while (!browser.getUrl().includes(expectedPath) && i < 60) {
      browser.pause(500);
      i++;
    }
    expect(browser.getUrl()).to.contain(expectedPath);
  },

  logger: function logger(message) {
    cucumberJson.attach(message);
  },

  waitForLoading: function(waitTime, index = 1, waitForExtraLoad = false, element = null) {
    waitTime = waitTime || browser.options.waitforTimeout;
    let isElementVisible = false;
    try {
      browser.pause(850);
      if (waitForExtraLoad) {
        browser.pause(1000);
      }
      const isDisplayed = $("//div[contains(@class,'_1tCT')] | //div[contains(@class,'LoadingIndicator')]").isDisplayed()
      if (element != null) {
        isElementVisible = element.selector.isDisplayed();
      } else {
        isElementVisible = true;
      }
      if (isDisplayed && index * 500 < waitTime) {
        this.waitForLoading(waitTime, index + 1);
      } else if (isDisplayed && index * 500 >= waitTime) {
        throw new Error(`API keeps loading even after ${waitTime}`);
      } else if (!isDisplayed && !waitForExtraLoad) {
        this.waitForLoading(waitTime, index, true);
      }
      if (!isElementVisible && index * 500 < waitTime) {
        this.waitForLoading(waitTime, index + 1);
      } else if (!isElementVisible && index * 500 >= waitTime) {
        throw new Error(`Element not visible even after ${waitTime}`);
      }
    } catch (err) {
      console.log(`Wait for Loading failed with error: ${err}`);
      throw err;
    }
  },
};

/**
 * Converts the obove object to Custom Command
 */

module.exports = {
  init: function() {
    Object.keys(customCommands).forEach(function(key) {
      browser.addCommand(key, customCommands[key]);
    });
  }
};
