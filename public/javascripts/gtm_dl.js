//push any data-gtag objects in the format "key:value, key:value" into global dataLayer
(function (d, w) {

	function ready(fn) {
		if (d.readyState !== 'loading') {
			fn();
		} else {
			d.addEventListener('DOMContentLoaded', fn);
		}
	}

	function parseData(string) {
		var properties = string.split(', ');
		var obj = {};
		properties.forEach(function(property) {
			var tup = property.split(':');
			obj[tup[0]] = tup[1]
		});
		return obj
	}

  var nuanceText;
  var availability;
  $(window).on("load", function() {

    var waitForEl = function(selector, callback) {
      if (jQuery(selector).length) {
        callback();
      } else {
        setTimeout(function() {
          waitForEl(selector, callback);
        }, 10000);
      }
    };

    waitForEl('#HMRC_Fixed_1 div span', function() {
       nuanceText = document.querySelector('#HMRC_Fixed_1 div span').innerText;
    });

  if(nuanceText == "Advisers are available to chat.") {
      availability = 'Ready';
  } else if(nuanceText == "All of our advisers are busy at the moment. You can remain on this page and one may become available.") {
      availability = 'Busy';
  } else if(nuanceText == "You are in a webchat.") {
      availability = 'In Progress';
  } else if(nuanceText == "Our webchat is now closed.") {
      availability = 'Offline';
  } else {
      availability = 'Not Responding';
  }

	  ready(function() {
	  	w.dataLayer = w.dataLayer || [];
	  	var localData = d.querySelectorAll('[data-gtag]');

	   	var localObj = {
			  'event': 'DOMContentLoaded',
        'Status': availability,
			  'Session ID': new Date().getTime() + '.' + Math.random().toString(36).substring(5),
			  'Hit TimeStamp': new Date().toUTCString()
	  	};
		  Array.prototype.forEach.call(localData, function (el, i) {
		  	localObj = Object.assign( localObj, parseData(el.getAttribute('data-gtag')) )
		  });

		w.dataLayer.push(localObj);
	  })
	});

})(document,window);