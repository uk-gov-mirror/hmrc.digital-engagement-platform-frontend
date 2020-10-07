import * as SUT from '../../app/assets/javascripts/statusObserver'

describe("The status observer", function() {
    var isObserved = false;
    global.MutationObserver = class {
        constructor(callback) {}
        disconnect() {}
        observe(element, initObject) {isObserved = true;}
    };

  	it("will execute callback method", () => {
        var output;

		SUT.observeStatus(() => {output = "success"},"test");

        expect(output).toBe("success");
    });
    
    it('will observe the element', () => {
        var output;

		SUT.observeStatus(() => true,"test");

        expect(isObserved).toBe(true);
    });
});