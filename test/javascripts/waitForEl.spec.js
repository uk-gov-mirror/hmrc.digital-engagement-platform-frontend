import * as SUT from '../../app/assets/javascripts/waitForEl'

describe("When waiting for an element", () => {
	
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


	describe("If the element we are waiting for is not available", () => {
		it("will attempt to fetch element again once wait is over", () => {
			document.body.innerHTML = `<input type="text" id="test2">`
	
			SUT.waitForEl("#test",() => true);
	
			jest.runOnlyPendingTimers();
	
			expect(setTimeout).toHaveBeenCalledTimes(2);
			expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
		});
		it("will wait by default 1000ms before attempting to check the element again", () => {
			var output;
	
			document.body.innerHTML = `<input type="text" id="test2">`
	
			SUT.waitForEl("#test",() => {output = "success"});
	
			expect(setTimeout).toHaveBeenCalledTimes(1);
			expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
		});

		it("after 10 attempts looking for the element, it will start looking every 5000 ms", () => {
			document.body.innerHTML = `<input type="text" id="test2">`
	
			SUT.waitForEl("#test",() => true);
	
			checkForElement9Times();
	
			expect(setTimeout).toHaveBeenCalledTimes(10);
			expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
		});
	});
});

function checkForElement9Times() {
	jest.runOnlyPendingTimers();
	jest.runOnlyPendingTimers();
	jest.runOnlyPendingTimers();
	jest.runOnlyPendingTimers();
	jest.runOnlyPendingTimers();
	jest.runOnlyPendingTimers();
	jest.runOnlyPendingTimers();
	jest.runOnlyPendingTimers();
	jest.runOnlyPendingTimers();
}

