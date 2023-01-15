import AppScreen from '../functions/screenFunctions/app.screen';

const SELECTORS = {
  ANDROID: {
    pushNotificationTitle:'//android.widget.TextView[contains(@resource-id, "/alertTitle")]',
    getStartedButton: "//android.widget.Button[contains(@resource-id,'/next_button')]",
    categoryPopupInHome : "//android.view.ViewGroup[contains(@resource-id,'/homeTutorialView')]/android.widget.TextView[contains(@text,'{}')]",
    defaultCategoryOptionInHome : "//android.view.ViewGroup/android.widget.TextView[contains(@resource-id,'/genderItem')][1]",

  },
  IOS: {

  },
};
class CommonScreenElements extends AppScreen {
  /**
* define elements
*/

  get pushNotificationTitle() {
    return $(SELECTORS[PLATFORM_NAME].pushNotificationTitle);
  }

  get getStartedButton() {
    return $(SELECTORS[PLATFORM_NAME].getStartedButton);
  }

  get categoryPopupInHome() {
    return $(SELECTORS[PLATFORM_NAME].categoryPopupInHome.replace("{}", "Select a category"));
  }

  get defaultCategoryOptionInHome() {
    return $(SELECTORS[PLATFORM_NAME].defaultCategoryOptionInHome);
  }
}

export default new CommonScreenElements();
