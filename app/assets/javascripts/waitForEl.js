import {availabilities} from './getAvailability'
import {createDataLayerElement} from './addToDataLayer'

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
          w.dataLayer = w.dataLayer || [];

          w.dataLayer.push(createDataLayerElement(availabilities.NuanceUnavailable, element));
        }

        waitForEl(element, callback, w, defaultTimeout, timesCheckedForElement + 1);
      }, defaultTimeout);
    }
  }