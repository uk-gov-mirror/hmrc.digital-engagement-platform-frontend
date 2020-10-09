export function waitForEl (element, callback, defaultTimeout = 1000, timesCheckedForElement = 1) {
    const selector = element + ' div span';
    if (jQuery(selector).length) {
      callback();
    } else {
      setTimeout(function () {
        if (timesCheckedForElement>=9) {
          defaultTimeout = 5000;
          $(element).text("Webchat is unavailable due to technical issues.")
        }

        waitForEl(element, callback, defaultTimeout, timesCheckedForElement + 1);
      }, defaultTimeout);
    }
  }