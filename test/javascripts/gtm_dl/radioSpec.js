//specify custom path

var path = '';
if (typeof window.__karma__ !== 'undefined') {
  path += 'base/'
} 

//jasmine.getFixtures().fixturesPath = path + 'tests/fixtures';


describe("Radio show hide test suite", function() {
  	it("It contains a spec with an expectation", function() {
  	  expect(true).toBe(true);
  	});
});
