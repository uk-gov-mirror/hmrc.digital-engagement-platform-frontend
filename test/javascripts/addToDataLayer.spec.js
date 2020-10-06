import * as SUT from '../../app/assets/javascripts/addToDataLayer'

describe("Add to data layer", function() {
  	it("will add all base properties", () => {
        document.body.innerHTML = `<input type="text" id="test" data-gtag="test">`

        var w = {
            dataLayer : []
        }

        var d = {
            querySelectorAll : () => {
                return $("#test");
            }
        }

        global.w = w;
        global.d = d;
        global.el = "test";

		SUT.addToDataLayer("Pending");

        expect(w.dataLayer[0].event).toBe('DOMContentLoaded');
        expect(w.dataLayer[0].ID).toBe('test');
        expect(w.dataLayer[0].Status).toBe('Pending');
        expect(w.dataLayer[0]["Session ID"]).not.toBe(undefined);
        expect(w.dataLayer[0]["Hit TimeStamp"]).not.toBe(undefined)
    });
    

  	it("will add each property within `data-gtag` to dataLayer array", () => {
        document.body.innerHTML = `<input type="text" id="test" data-gtag="engine:v6, color:blue, alloys:20 inches">`

        var data = {
            dataLayer : []
        }

        var d = {
            querySelectorAll : () => {
                return $("#test");
            }
        }

        global.w = data;
        global.d = d;
        global.el = "test";

		SUT.addToDataLayer("Pending");

        expect(data.dataLayer[0].alloys).toBe('20 inches');
        expect(data.dataLayer[0].color).toBe('blue');
        expect(data.dataLayer[0].engine).toBe('v6');
	});
});