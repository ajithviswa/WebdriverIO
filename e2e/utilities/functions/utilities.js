let SCREEN_SIZE;
/**
 * The values in the below object are percentages of the screen
 */

const SWIPE_DIRECTION = {
  down: {
    start: { x: 50, y: 25 },
    end: { x: 50, y: 65 }
  },
  left: {
    start: { x: 95, y: 50 },
    end: { x: 5, y: 50 }
  },
  right: {
    start: { x: 5, y: 50 },
    end: { x: 95, y: 50 }
  },
  up: {
    start: { x: 50, y: 85 },
    end: { x: 50, y: 15 }
  },
  quickdown: {
    start: { x: 50, y: 30 },
    end: { x: 50, y: 85 }
  }
};

const utilities = {
  /**
   * Check if an element is visible and if not scroll down a portion of the screen to
   * check if it visible after a x amount of scrolls
   *
   * @param {element} element
   * @param {number} maxScrolls
   * @param {number} amount
   */
  checkIfDisplayedWithScrollUp(element, maxScrolls, swipePercent, amount = 0) {
    element = !isAndroid ? $(element.selector) : element;
      if ((!element.isDisplayed()) && amount <= maxScrolls) {
        console.log('is element enabled', element.isDisplayed());
        swipePercent ? this.swipeDown(swipePercent) : this.swipeDown(1.0);
        this.checkIfDisplayedWithScrollUp(element, maxScrolls, swipePercent, amount + 1);
      } else if (amount > maxScrolls) {
        throw new Error(`The element '${element}' could not be found or is not visible.`);
      }
  },

  checkIfDisplayedWithScrollDown(element, maxScrolls, swipePercent, amount = 0) {
    element = !isAndroid ? $(element.selector) : element;
    if ((!element.isDisplayed()) && amount <= maxScrolls) {
      console.log('iselement Visible', element.isDisplayed());
      swipePercent ? this.swipeUp(swipePercent) : this.swipeUp(1.0);
      this.checkIfDisplayedWithScrollDown(element, maxScrolls, swipePercent, amount + 1);
    } else if (amount > maxScrolls) {
      throw new Error(`The element '${element}' could not be found or is not visible.`);
    }
  },
  /**
   * Swipe down based on a percentage
   *
   * @param {number} percentage from 0 - 1
   */
  swipeDown: function(percentage = 1) {
    this.swipeOnPercentage(
      this._calculateXY(SWIPE_DIRECTION.down.start, percentage),
      this._calculateXY(SWIPE_DIRECTION.down.end, percentage),
    );
  },

  quickSwipeDown: function(percentage = 1) {
    this.quickSwipeOnPercentage(
      this._calculateXY(SWIPE_DIRECTION.quickdown.start, percentage),
      this._calculateXY(SWIPE_DIRECTION.quickdown.end, percentage),
    );
  },

  /**
   * Swipe Up based on a percentage
   *
   * @param {number} percentage from 0 - 1
   */
  swipeUp: function(percentage = 1) {
    this.swipeOnPercentage(
      this._calculateXY(SWIPE_DIRECTION.up.start, percentage),
      this._calculateXY(SWIPE_DIRECTION.up.end, percentage),
    );
  },

  /**
   * Swipe left based on a percentage
   *
   * @param {number} percentage from 0 - 1
   */
  swipeLeft: function(percentage = 1) {
    this.swipeOnPercentage(
      this._calculateXY(SWIPE_DIRECTION.left.start, percentage),
      this._calculateXY(SWIPE_DIRECTION.left.end, percentage),
    );
  },

  /**
   * Swipe right based on a percentage
   *
   * @param {number} percentage from 0 - 1
   */
  swipeRight: function(percentage = 1) {
    this.swipeOnPercentage(
      this._calculateXY(SWIPE_DIRECTION.right.start, percentage),
      this._calculateXY(SWIPE_DIRECTION.right.end, percentage),
    );
  },

  /**
   * Swipe from coordinates (from) to the new coordinates (to).
   * The given coordinates are
   * percentages of the screen.
   *
   * @param {object} from { x: 50, y: 50 }
   * @param {object} to { x: 25, y: 25 }
   *
   * @example
   * <pre>
   *   // This is a swipe to the left
   *   const from = { x: 50, y:50 };
   *   const to = { x: 25, y:50 };
   * </pre>
   */
  swipeOnPercentage: function(from, to) {
    SCREEN_SIZE = SCREEN_SIZE || browser.getWindowSize();
    const pressOptions = this._getDeviceScreenCoordinates(SCREEN_SIZE, from);
    const moveToScreenCoordinates = this
      ._getDeviceScreenCoordinates(SCREEN_SIZE, to);
    this.swipe(
      pressOptions,
      moveToScreenCoordinates,
    );
  },

  quickSwipeOnPercentage:function(from, to) {
    SCREEN_SIZE = SCREEN_SIZE || browser.getWindowSize();
    const pressOptions = this._getDeviceScreenCoordinates(SCREEN_SIZE, from);
    const moveToScreenCoordinates = this
      ._getDeviceScreenCoordinates(SCREEN_SIZE, to);
    this.quickSwipe(
      pressOptions,
      moveToScreenCoordinates,
    );
  },

  /**
   * Swipe from coordinates (from) to the new coordinates (to).
   * The given coordinates are in pixels.
   *
   * @param {object} from { x: 50, y: 50 }
   * @param {object} to { x: 25, y: 25 }
   *
   * @example
   * <pre>
   *   // This is a swipe to the left
   *   const from = { x: 50, y:50 }
   *   const to = { x: 25, y:50 }
   * </pre>
   */
  swipe: function(from, to) {
    browser.touchPerform([{
      action: 'press',
      options: from
    }, {
      action: 'wait',
      options: { ms: 1000 }
    }, {
      action: 'moveTo',
      options: to
    }, {
      action: 'release'
    }]);
    browser.pause(1000);
  },

  quickSwipe: function(from, to) {
    browser.touchPerform([{
      action: 'press',
      options: from
    }, {
      action: 'wait',
      options: { ms: 300 }
    }, {
      action: 'moveTo',
      options: to
    }, {
      action: 'release'
    }]);
    browser.pause(1000);
  },

  doubleClick: function(element) {
    browser.touchPerform([
      {
        action: 'tap',
        options: { x:element.x, y:element.y },
      },
      {  
        action: 'tap',
        options: { x:element.x, y:element.y }
      }
    ]);
  },

  /**
   * Get the screen coordinates based on a device his screensize
   *
   * @param {number} screenSize the size of the screen
   * @param {object} coordinates like { x: 50, y: 50 }
   *
   * @return {{x: number, y: number}}
   *
   * @private
   */
  _getDeviceScreenCoordinates: function(screenSize, coordinates) {
    return {
      x: Math.round(screenSize.width * (coordinates.x / 100)),
      y: Math.round(screenSize.height * (coordinates.y / 100))
    };
  },

  /**
   * Calculate the x y coordinates based on a percentage
   *
   * @param {object} coordinates
   * @param {number} percentage
   *
   * @return {{x: number, y: number}}
   *
   * @private
   */
  _calculateXY: function({ x, y }, percentage) {
    return {
      x: x * percentage,
      y: y * percentage
    };
  },

  waitForIsShown: function(selector) {
    browser.waitUntil(() => {
      return (selector.waitForDisplayed({ timeout: 3000 }) == true);
    }, 30000, 'Element is not available');
  },

 getXpathByText: function(element, text, charType) {
    const regex = /^[A-Za-z0-9 ]+$/;
    const textValue = (regex.test(text) && charType) ? text.toUpperCase() : text;
    return element.replace('{}', textValue);
  }
}

// export default utilities;
module.exports = Object.create(utilities);

