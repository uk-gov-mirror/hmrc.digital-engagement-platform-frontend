import {availabilities} from './getAvailability'
import {createDataLayerElement,reportEvent} from './addToDataLayer'

export function waitForEl (element, callback, w, defaultTimeout = 1000, timesCheckedForElement = 0) {
    const selector = element + ' div span';
    const maxNumberOfAttempts = 9;

    if (jQuery(selector).length) {
      callback();
    } else {
      setTimeout(function () {
        if (timesCheckedForElement == maxNumberOfAttempts) {
          $(element).text("Webchat is experiencing technical difficulties. Please keep refreshing the page to try again.")
          reportEvent(w,createDataLayerElement(availabilities.NuanceUnavailable, element))
          return;
        }

        waitForEl(element, callback, w, defaultTimeout, timesCheckedForElement + 1);
      }, defaultTimeout);
    }
  }