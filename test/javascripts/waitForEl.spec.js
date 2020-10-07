import * as SUT from '../../app/assets/javascripts/waitForEl'

describe("When waiting for an element", function() {
	
	beforeEach(() => {
	    jest.useFakeTimers();
	});

	afterEach(() => {
		jest.clearAllTimers();	
	});
	it("will execute the callback if the element exists", () => {
		var output;
		document.body.innerHTML = `<input type="text" id="test">`

		SUT.waitForEl("#test",() => {output = "success"});

		expect(output).toEqual("success");
	});

	it("will wait by default 1000ms before attempting to check the element again when it is not there", () => {
		var output;

		document.body.innerHTML = `<input type="text" id="test2">`

		SUT.waitForEl("#test",() => {output = "success"});

		expect(setTimeout).toHaveBeenCalledTimes(1);
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
	});

	it("will attempt to fetch element again once wait is over", () => {
		document.body.innerHTML = `<input type="text" id="test2">`

		SUT.waitForEl("#test",() => true);

		jest.runOnlyPendingTimers();

		expect(setTimeout).toHaveBeenCalledTimes(2);
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
	});
});

