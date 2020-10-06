 import * as SUT from '../../app/assets/javascripts/waitForEl'
 import jQuery from 'jquery';

describe("Parse data", function() {
	const $ = require('jquery');
  	it("will parse the element into an object", () => {
		const test = SUT.waitForEl("myId",()=>true);

		expect(test.motor).toBe("v6");
	});
});