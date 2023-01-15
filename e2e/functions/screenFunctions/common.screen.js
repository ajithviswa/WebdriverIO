import AppScreen from './app.screen';
import CommonScreenElements from '../../screenobjects/common.native';
import utilities from '../../utilities/functions/utilities';

class common extends AppScreen {


  navigateToHomePage() {
    browser.waitForLoading();
    const element = CommonScreenElements.getStartedButton;
    if (element.isExisting()) {
      utilities.waitForIsShown(element);
      element.waitForDisplayed();
      element.click();
    }
  }

  isHomePageLoaded() {
    browser.waitForLoading();
    if (CommonScreenElements.categoryPopupInHome.isDisplayed()) {
      CommonScreenElements.defaultCategoryOptionInHome.click();
    }
  }

}

export default new common();