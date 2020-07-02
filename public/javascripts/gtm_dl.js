//push any data-gtag objects in the format "key:value, key:value" into global dataLayer
(function (d, w) {
  function parseData(string) {
    var properties = string.split(', ');
    var obj = {};
    properties.forEach(function (property) {
      var tup = property.split(':');
      obj[tup[0]] = tup[1]
    });
    return obj
  }

  function waitForEl (selector, callback) {
    if (jQuery(selector).length) {
      callback();
    } else {
      setTimeout(function () {
        waitForEl(selector, callback);
      }, 1000);
    }
  }

  function observeStatus() {
    let elementToObserve = document.querySelector("#HMRC_Fixed_1");

    let observer = new MutationObserver(function() {
      setAvailability();
    });

    observer.observe(elementToObserve, {subtree: true, childList: true});
  }

  function setAvailability() {
    var availability;
    var nuanceText = document.querySelector('#HMRC_Fixed_1 div span').innerHTML;

    if (nuanceText === "Advisers are available to chat.") {
      availability = 'Ready';
    } else if (nuanceText === "All of our advisers are busy at the moment. You can remain on this page and one may become available.") {
      availability = 'Busy';
    } else if (nuanceText === "You are in a webchat.") {
      availability = 'In Progress';
    } else if (nuanceText === "Our webchat is now closed.") {
      availability = 'Offline';
    } else {
      availability = 'Not Responding';
    }

    addToDataLayer(availability);
  }

  function addToDataLayer (status) {
    w.dataLayer = w.dataLayer || [];
    var localData = d.querySelectorAll('[data-gtag]');

    var localObj = {
      'event': 'DOMContentLoaded',
      'Status': status,
      'Session ID': new Date().getTime() + '.' + Math.random().toString(36).substring(5),
      'Hit TimeStamp': new Date().toUTCString()
    };
    Array.prototype.forEach.call(localData, function (el, i) {
      localObj = Object.assign(localObj, parseData(el.getAttribute('data-gtag')))
    });

    w.dataLayer.push(localObj);
  }

  $(window).on("load", function () {
    waitForEl('#HMRC_Fixed_1 div span', function () {
      setAvailability();
      observeStatus();
    });
  });
})(document, window);

GOVUK.details.init();
