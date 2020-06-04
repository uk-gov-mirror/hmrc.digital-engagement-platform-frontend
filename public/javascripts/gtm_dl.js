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



	ready(function() {
		w.dataLayer = w.dataLayer || [];
		var localData = d.querySelectorAll('[data-gtag]');
		var nuanceText = document.querySelector('[id=HMRC_Fixed_1] div span').innerText;

        if(nuanceText == "Advisers are available to chat.") {
            var availability = 'Ready';
        } else if(nuanceText == "All of our advisers are busy at the moment. You can remain on this page and one may become available.") {
            var availability = 'Busy';
        } else if(nuanceText == "You are in a webchat.") {
            var availability = 'In Progress';
        } else if(nuanceText == "Our webchat is now closed.") {
            var availability = 'Offline';
        } else {
            var availability = 'Not Responding';
        }

		var localObj = {
			'event': 'DOMContentLoaded',
			'Status change 1': document.getElementById('HMRC_Fixed_1').getAttribute('span'),
			'Status change 2': document.getElementById('HMRC_Fixed_1').value,
			'Status change 3': document.getElementById('HMRC_Fixed_1').value = document.getElementById('span'),
			'Status change 4': document.getElementById('span'),
			'Status change 5': document.getElementById('HMRC_Fixed_1').span,
			'Status change 6': document.getElementById('HMRC_Fixed_1').querySelectorAll('span'),
			'Status change 7': document.getElementById('HMRC_Fixed_1').querySelectorAll('span').value,
			'Status change 8': document.getElementById('HMRC_Fixed_1').innerHTML,
			//'Status change 9': document.getElementById('HMRC_Fixed_1').innerText,
			'Status change 10': document.getElementById('HMRC_Fixed_1').onChange = function () {
                                    document.getElementById('hidden_field_id').value = document.getElementById('span').innerHTML;
                                },
            'Status change 11': availability,
			'Session ID': new Date().getTime() + '.' + Math.random().toString(36).substring(5),
			'Hit TimeStamp': new Date().toUTCString()
		};
		Array.prototype.forEach.call(localData, function (el, i) {
			localObj = Object.assign( localObj, parseData(el.getAttribute('data-gtag')) )
		});

		w.dataLayer.push(localObj);
	})

})(document,window);