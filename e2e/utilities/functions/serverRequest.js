/*
 Utility module for creating test prerequisites
 */
const request = require('request');
module.exports = {
  
  /**
   * User checks email address
   */
  checkMailAddress: function() {
    browser.waitForLoading();
    const URLRecipient = `${constants.Mail_URL}?q=" ${browser.params.email}`;
    new Promise(function(resolve) {
      request(
        {
          url: URLRecipient, // URL to hit
          method: 'GET', // Specify the method
          headers: {
            // Define headers
            Authorization: 'Bearer '.concat(browser.params.access_token)
          }
        },
        function(error, response, body) {
          if (error) {
            console.log(error);
            resolve(undefined);
          } else {
            body = JSON.parse(body);
            if (body.messages) {
              browser.params.messageID = body.messages[0].id;
            }
            resolve(true);
          }
        }
      );
    });
    browser.waitForLoading();
  },

};
