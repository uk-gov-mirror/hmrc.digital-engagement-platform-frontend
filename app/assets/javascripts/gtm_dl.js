import * as availabilityChecker from './getAvailability'
import * as parser from './parseData'
import * as elementWatcher from './waitForEl'

function addToDataLayer (status, elToAdd) {
  w.dataLayer = w.dataLayer || [];
  var localData = d.querySelectorAll('[data-gtag]');

  var localObj = {
    'event': 'DOMContentLoaded',
    'Status': status,
    'ID' : el,
    'Session ID': new Date().getTime() + '.' + Math.random().toString(36).substring(5),
    'Hit TimeStamp': new Date().toUTCString()
  };

  Array.prototype.forEach.call(localData, function (elToAdd, i) {
    localObj = Object.assign(localObj, parser.parseData(elToAdd.getAttribute('data-gtag')))
  });

  w.dataLayer.push(localObj);
}

//push any data-gtag objects in the format "key:value, key:value" into global dataLayer
function gtmDl(d, w, el) {
  function observeStatus() {
    let elementToObserve = document.querySelector(el);

    let observer = new MutationObserver(function() {
      var nuanceText = document.querySelector(el + ' div span').innerHTML;

      addToDataLayer(availabilityChecker.getAvailability(nuanceText), el);
    });

    observer.observe(elementToObserve, {subtree: true, childList: true});
  }

  $(window).on("load", function () {
    elementWatcher.waitForEl(el + ' div span', function () {
      var nuanceText = document.querySelector(el + ' div span').innerHTML;

      addToDataLayer(availabilityChecker.getAvailability(nuanceText), el);

      observeStatus();
    });
  });
};

gtmDl(document, window, '#HMRC_Fixed_1');