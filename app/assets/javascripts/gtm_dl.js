import * as availabilityChecker from './getAvailability'
import * as elementWatcher from './waitForEl'
import * as dataLayer from './addToDataLayer'


//push any data-gtag objects in the format "key:value, key:value" into global dataLayer
function gtmDl(d, w, el) {
  function observeStatus() {
    let elementToObserve = document.querySelector(el);

    let observer = new MutationObserver(function() {
      var nuanceText = document.querySelector(el + ' div span').innerHTML;

      dataLayer.addToDataLayer(availabilityChecker.getAvailability(nuanceText), el);
    });

    observer.observe(elementToObserve, {subtree: true, childList: true});
  }

  $(window).on("load", function () {
    elementWatcher.waitForEl(el + ' div span', function () {
      var nuanceText = document.querySelector(el + ' div span').innerHTML;

      dataLayer.addToDataLayer(availabilityChecker.getAvailability(nuanceText), el);

      observeStatus();
    });
  });
};

gtmDl(document, window, '#HMRC_Fixed_1');