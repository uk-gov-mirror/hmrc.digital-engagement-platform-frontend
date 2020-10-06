 import * as SUT from '../../app/assets/javascripts/setAvailability'


describe("Set availability", function() {
  	it("will be `Ready` when nuance reports `Advisers are available to chat.`", () => {
		const availability = SUT.getAvailability("Advisers are available to chat.");

		expect(availability).toBe("Ready");
	});

	it("will be `Busy` when nuance reports `All of our advisers are busy at the moment. Keep checking this page until the 'speak to an adviser' link becomes available.`", () => {
		const availability = SUT.getAvailability("All of our advisers are busy at the moment. Keep checking this page until the 'speak to an adviser' link becomes available.");

		expect(availability).toBe("Busy");
	});

	it("will be `In Progress` when nuance reports `You are in a webchat.`", () => {
		const availability = SUT.getAvailability("You are in a webchat.");

		expect(availability).toBe("In Progress");
	});

	it("will be `Offline` when nuance reports `Our webchat is now closed.`", () => {
		const availability = SUT.getAvailability("Our webchat is now closed.");

		expect(availability).toBe("Offline");
	});

	it("will be `In Chat` when nuance reports `You are in a webchat. If you cannot access it, you may have another chat window open.`", () => {
		const availability = SUT.getAvailability("You are in a webchat. If you cannot access it, you may have another chat window open.");

		expect(availability).toBe("In Chat");
	});

	it("will be `Not Responding` for any unknown report from nuance", () => {
		const availability = SUT.getAvailability("test");

		expect(availability).toBe("Not Responding")
	});
});