export function waitForEl (selector, callback, defaultTimeout = 1000, timesCheckedForElement = 1) {
    if (jQuery(selector).length) {
      callback();
    } else {
      setTimeout(function () {
        waitForEl(selector, callback, timesCheckedForElement >= 9 ? 5000 : 1000, timesCheckedForElement + 1);
      }, defaultTimeout);
    }
  }