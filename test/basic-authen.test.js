var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
if (!isBrowser()) {
	bfet = require('../src/bfet');
}

var mock = require('./mockContext.js');

describe("basic authentication as parameter", function() {
	it("should get result back", function(done) {

		// this token has only read access permission to user's profile data
		// so no worry :)
		// try to avoid sending as header as it might break in case of web
		bfet.get("https://api.github.com/user?access_token=" + mock.oauth)
			.then((result) => {
				// ensure that result is object
				expect(typeof result.response == "object").toBeTruthy();
				expect(result.response.success).not.toBe(null);
				done();
			}, (e) => {
				fail(e);
			});
	});
});

if (!isBrowser()) {
	describe("basic authentication as basic authorization header", function() {
		it("should get result back", function(done) {

			// this token has only read access permission to user's profile data
			// so no worry :)
			// try to avoid sending as header as it might break in case of web
			bfet.get("https://api.github.com/user", null, { username: mock.username, password: mock.password})
				.then((result) => {
					// ensure that result is object
					expect(typeof result.response == "object").toBeTruthy();
					expect(result.response.success).not.toBe(null);
					done();
				}, (e) => {
					fail(e);
				});
		});
	});

	describe("basic authentication as oauth header", function() {
		it("should get result back", function(done) {

			// this token has only read access permission to user's profile data
			// so no worry :)
			// try to avoid sending as header as it might break in case of web
			bfet.get("https://api.github.com/user", null, {
				headers: {
					Authorization: "token " + mock.oauth
				}
			})
				.then((result) => {
					// ensure that result is object
					expect(typeof result.response == "object").toBeTruthy();
					expect(result.response.success).not.toBe(null);
					done();
				}, (e) => {
					fail(e);
				});
		});
	});
}
