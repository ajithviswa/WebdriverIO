const DOCUMENT_READY_STATE = {
  COMPLETE: 'complete',
  INTERACTIVE: 'interactive',
  LOADING: 'loading'
};

class WebView {
  /**
   * Wait for the webview context to be loaded
   *
   * By default you have `NATIVE_APP` as the current context.
   * If a webview is loaded it will be
   * added to the current contexts and will looks something like this
   *
   */
  waitForWebViewContextLoaded (packageName) {
    browser.waitUntil(
        () => {
            const currentContexts = this.getCurrentContexts();
            return currentContexts.length > 1 &&
                currentContexts.find(context => context.toLowerCase().includes(packageName));
        }, {
            timeout: 55000,
            timeoutMsg: 'Webview context not loaded',
            interval: 100,
        },
    );
}

/**
 * Switch to native or webview context
 *
 * @param {string} context should be native of webview
 */
switchToContext (context) {
    browser.switchContext(this.getCurrentContexts()[context === constants.WEB_PACKAGE ? 1 : 0]);
}

/**
 * Returns an object with the list of all available contexts
 *
 * @return {object} An object containing the list of all available contexts
 */
getCurrentContexts () {
    return browser.getContexts();
}

/**
 * Wait for the document to be full loaded
 */
waitForDocumentFullyLoaded () {
    browser.waitUntil(
        () => browser.execute(() => document.readyState) === DOCUMENT_READY_STATE.COMPLETE,
        {
            timeout: 55000,
            timeoutMsg: 'Website not loaded',
            interval: 20000,
        },
    );
}

  /**
   * Wait for the website in the webview to be loaded
   */
  waitForWebsiteLoaded() {
    this.waitForWebViewContextLoaded(constants.WEB_PACKAGE);
    this.switchToContext(constants.WEB_PACKAGE);
    this.waitForDocumentFullyLoaded();
    browser.pause(5000)
  }
}

export default WebView;
