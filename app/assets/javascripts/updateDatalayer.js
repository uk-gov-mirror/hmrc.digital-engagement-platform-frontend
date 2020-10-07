import * as availabilityChecker from './getAvailability'
import * as dataLayer from './addToDataLayer'


export function updateDataLayer(el,w,d) {
    var nuanceText = document.querySelector(el + ' div span').innerHTML;
  
    dataLayer.addToDataLayer(availabilityChecker.getAvailability(nuanceText), el, w, d);
  }