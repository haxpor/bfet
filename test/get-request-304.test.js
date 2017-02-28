var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
if (!isBrowser()) {
	bfet = require('../src/bfet');
}

describe("get with 304", function() {

	// github supports etag
	// thus in this case we target on caching against etag
	var url = "https://api.github.com/orgs/angrybaozi/repos";

	it("should get response object attached in success route", function(done) {

		// make a first request
		bfet.get(url)
			.then((r1) => {
				// ensure that result is object
				expect(typeof r1.response == "object").toBeTruthy();
				expect(r1.response.success).not.toBe(null);

				// 2nd request
				bfet.get(url)
					.then((r2) => {
						done();
					}, (e2) => {
						fail(e2);
					});

			}, (e1) => {
				fail(e1);
			});
	});
});
