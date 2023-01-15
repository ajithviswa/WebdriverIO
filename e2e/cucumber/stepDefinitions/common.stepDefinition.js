import common from '../../functions/screenFunctions/common.screen';

const { Then, Given, When } = require('cucumber');

Given(/^User opens the App and navigates to the home page$/, () => {
  common.navigateToHomePage();
});

Then(/^User redirects to the Home page$/, () => {
  common.isHomePageLoaded();
});