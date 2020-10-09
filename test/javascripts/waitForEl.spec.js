import * as SUT from '../../app/assets/javascripts/waitForEl'
import {availabilities} from '../../app/assets/javascripts/getAvailability'

describe("When waiting for an element", () => {
	let w;
	beforeEach(() => {
		w = {dataLayer : []};
	    jest.useFakeTimers();
	});

	afterEach(() => {
		jest.clearAllTimers();	
	});
	it("will execute the callback if the element exists", () => {
		var output;
		document.body.innerHTML = `<div id="test"><div><span>Test</span></div></div>`

		SUT.waitForEl("#test",() => {output = "success"}, w);

		expect(output).toEqual("success");
	});


	describe("If the element we are waiting for is not available", () => {
		it("will attempt to fetch element again once wait is over", () => {
			document.body.innerHTML = `<input type="text" id="test2">`
	
			SUT.waitForEl("#test",() => true, w);
	
			jest.runOnlyPendingTimers();
	
			expect(setTimeout).toHaveBeenCalledTimes(2);
			expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
		});
		it("will wait by default 1 second before attempting to check the element again", () => {
			var output;
	
			document.body.innerHTML = `<input type="text" id="test2">`
	
			SUT.waitForEl("#test",() => {output = "success"}, w);
	
			expect(setTimeout).toHaveBeenCalledTimes(1);
			expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
		});

		describe("And we have already checked 10 times", () => {
			it("will start looking for the element every 5 seconds", () => {
				document.body.innerHTML = `<input type="text" id="test2">`
		
				SUT.waitForEl("#test",() => true, w);
		
				checkForElement9Times();
		
				expect(setTimeout).toHaveBeenCalledTimes(10);
				expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
			});

			it("will report on technical difficulties", () => {
				document.body.innerHTML = `<div id="HMRC_Fixed_1"></div>`
		
				SUT.waitForEl("#HMRC_Fixed_1",() => true, w);
		
				checkForElement9Times();
		
				expect($("#HMRC_Fixed_1").text()).toEqual("Webchat is unavailable due to technical issues.")
			});

			it("will raise a technical difficultes event on data layer", () => {
				document.body.innerHTML = `<div id="HMRC_Fixed_1"></div>`
		
				SUT.waitForEl("#HMRC_Fixed_1",() => true, w);
		
				checkForElement9Times();
		
				expect(w.dataLayer[0].event).toBe('DOMContentLoaded');
				expect(w.dataLayer[0].ID).toBe('#HMRC_Fixed_1');
				expect(w.dataLayer[0].Status).toBe(availabilities.NuanceUnavailable);
				expect(w.dataLayer[0]["Session ID"]).not.toBe(undefined);
				expect(w.dataLayer[0]["Hit TimeStamp"]).not.toBe(undefined)			
			});

			it("will report on technical difficulties and to data layer only once", () => {
				document.body.innerHTML = `<div id="HMRC_Fixed_1"></div>`
		
				SUT.waitForEl("#HMRC_Fixed_1",() => true, w);
		
				checkForElement9Times();
				$("#HMRC_Fixed_1").text("Text not changed")
				jest.runOnlyPendingTimers();
		
				expect($("#HMRC_Fixed_1").text()).toEqual("Text not changed")
				expect(w.dataLayer.length).toEqual(1)
			});
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

