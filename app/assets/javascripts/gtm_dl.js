import * as availabilityChecker from './getAvailability'
import * as elementWatcher from './waitForEl'
import * as dataLayer from './addToDataLayer'
import * as statusObserver from './statusObserver'

function updateDataLayer(el,w,d) {
  var nuanceText = document.querySelector(el + ' div span').innerHTML;

  dataLayer.addToDataLayer(availabilityChecker.getAvailability(nuanceText), el, w, d);
}


function gtmDl(d, w, el) {
  $(window).on("load", function () {
    elementWatcher.waitForEl(el + ' div span', function () {
      updateDataLayer(el,w,d);

      statusObserver.observeStatus(updateDataLayer(el,w,d));
    });
  });
};

gtmDl(document, window, '#HMRC_Fixed_1');