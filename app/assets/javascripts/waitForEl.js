export function waitForEl (selector, callback, defaultTimeout = 1000) {
    if (jQuery(selector).length) {
      callback();
    } else {
      setTimeout(function () {
        waitForEl(selector, callback);
      }, defaultTimeout);
    }
  }