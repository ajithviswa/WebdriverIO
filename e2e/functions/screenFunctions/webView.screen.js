import WebView from '../../utilities/functions/webView';

const SELECTORS = {
  WEB_VIEW_SCREEN: browser.isAndroid ?
    '*//android.webkit.WebView' : '*//XCUIElementTypeWebView'
};

class WebViewScreen extends WebView {
  /**
   * Wait for the screen to be visible based on Xpath
   *
   * @param {boolean} isShown
   */
  waitForWebViewIsShownByXpath(isShown = true) {
    browser.waitForDisplayed(SELECTORS.WEB_VIEW_SCREEN, 20000, !isShown);
  }
}

export default new WebViewScreen();
