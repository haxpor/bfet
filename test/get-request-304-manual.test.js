var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
if (!isBrowser()) {
	bfet = require('../src/bfet');
}

describe("get with 304 - manual", function() {

	// github supports etag
	// thus in this case we target on caching against etag
	var url = "https://api.github.com/orgs/angrybaozi/repos";

	beforeAll(function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

		// user want to handle caching manually
		bfet.global.options.enableCaching = false;
	});

	afterAll(function() {
		// set back to default
		bfet.global.options.enableCaching = true;
	});

	it("should get response object attached in error route", function(done) {

		// saved etag from responseHeaders of first request
		// to test http cache
		var etag;
		var cachedItem;

		// make a first request
		bfet.get(url)
			.then((r1) => {
				// save cached item
				// normally users handle cached item here
				cachedItem = r1.response;
				// save etag
				etag = r1.responseHeaders.etag;

				// ensure that result is object
				expect(typeof r1.response == "object").toBeTruthy();
				expect(r1.response.success).not.toBe(null);

				// 2nd request
				bfet.get(url, null, { 
					headers: {
						'If-None-Match': etag
					}
				}).then((r2) => {
						fail("response should be 304");
					}, (e2) => {
						done();
					});

			}, (e1) => {
				fail(e1);
			});
	});
});
