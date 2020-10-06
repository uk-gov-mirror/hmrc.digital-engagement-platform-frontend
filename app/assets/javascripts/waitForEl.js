export function waitForEl (selector, callback) {
    if (jQuery(selector).length) {
      callback();
    } else {
      setTimeout(function () {
        waitForEl(selector, callback);
      }, 1000);
    }
  }