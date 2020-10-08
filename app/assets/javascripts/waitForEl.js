export function waitForEl (selector, callback, defaultTimeout = 1000, timesCheckedForElement = 1) {
    if (jQuery(selector).length) {
      callback();
    } else {
      setTimeout(function () {
        if (timesCheckedForElement>=9) {
          console.log("waiting for " + selector)
          $("#HMRC_Fixed_1").text("Webchat is unavailable due to technical issues.")
        }

        waitForEl(selector, callback, timesCheckedForElement >= 9 ? 5000 : 1000, timesCheckedForElement + 1);
      }, defaultTimeout);
    }
  }