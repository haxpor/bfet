var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
if (!isBrowser()) {
	bfet = require('../src/bfet');
}

describe("basic authentication", function() {
	it("should get result back", function(done) {

		bfet.get("https://api.github.com/issues", null, { username: "haxpor", password: process.env.GITHUB_PERSONAL_TOKEN_TEST})
			.then((result) => {
				// ensure that result is object
				expect(typeof result == "object").toBeTruthy();
				expect(result.success).not.toBe(null);
				done();
			}, (e) => {
				fail(e);
			});
	});
});
