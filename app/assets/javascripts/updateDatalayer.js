import * as availabilityChecker from './getAvailability'

export function updateDataLayer(el,w,d) {
    var nuanceText = document.querySelector(el + ' div span').innerHTML;
  
    dataLayer.addToDataLayer(availabilityChecker.getAvailability(nuanceText), el, w, d);
  }