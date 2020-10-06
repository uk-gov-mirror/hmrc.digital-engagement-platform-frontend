import * as availabilityChecker from './getAvailability'
import * as elementWatcher from './waitForEl'
import * as dataLayer from './addToDataLayer'
import * as statusObserver from './statusObserver'

function updateDataLayer() {
  var nuanceText = document.querySelector(el + ' div span').innerHTML;

  dataLayer.addToDataLayer(availabilityChecker.getAvailability(nuanceText), el);
}

//push any data-gtag objects in the format "key:value, key:value" into global dataLayer
function gtmDl(d, w, el) {
  $(window).on("load", function () {
    elementWatcher.waitForEl(el + ' div span', function () {
      updateDataLayer();

      statusObserver.observeStatus(updateDataLayer());
    });
  });
};

gtmDl(document, window, '#HMRC_Fixed_1');