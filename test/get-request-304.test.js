var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
if (!isBrowser()) {
	bfet = require('../src/bfet');
}

describe("get with 304", function() {

	beforeAll(function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
	});

	// github supports etag
	// thus in this case we target on caching against etag
	var url = "https://api.github.com/orgs/angrybaozi/repos";

	it("should get response object attached in success route", function(done) {

		// make a first request
		bfet.get(url).then((result) => {
				// ensure that result is object
				expect(typeof result.response == "object").toBeTruthy();
				expect(result.response.success).not.toBe(null);

				return bfet.get(url);
			}, (e) => {
				fail("1:", e);
			})
			// 2nd request
			.then((result) => {
				done();
			}, (e) => {
				fail("2:", e);
			})
	});
});
