import {availabilities} from './getAvailability'
import {createDataLayerElement,reportEvent} from './addToDataLayer'

export function waitForEl (element, callback, w, defaultTimeout = 1000, timesCheckedForElement = 1) {
    const selector = element + ' div span';
    const maxNumberOfAttempts = 9;

    if (jQuery(selector).length) {
      callback();
    } else {
      setTimeout(function () {
        if (timesCheckedForElement == maxNumberOfAttempts) {
          defaultTimeout = 5000;
          $(element).text("Webchat is unavailable due to technical issues.")
          reportEvent(w,createDataLayerElement(availabilities.NuanceUnavailable, element))
        }

        waitForEl(element, callback, w, defaultTimeout, timesCheckedForElement + 1);
      }, defaultTimeout);
    }
  }