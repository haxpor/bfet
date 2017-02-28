var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
if (!isBrowser()) {
	bfet = require('../src/bfet');
}

describe("get request", function() {
	it("should get object as result", function(done) {
		bfet.get("https://api.pbapp.net/Player/jontestuser?api_key=2043203153")
			.then((result) => {
				// ensure that result is object
				expect(typeof result.response == "object").toBeTruthy();
				expect(result.response.success).not.toBe(null);
				done();
			}, (e) => {
				fail(e);
			});
	});

	it("should get string as result", function(done) {
		bfet.get("https://api.pbapp.net/Player/jontestuser?api_key=2043203153", null, { json_parse: false })
			.then((result) => {
				// ensure that result is not object
				expect(typeof result.response == "string").toBeTruthy();
				expect(result.response.success == undefined || result.success == null).toBeTruthy();
				done();
			}, (e) => {
				fail(e);
			});
	});

	it("should form get url param properly and get success result back from API - json", function(done) {

		var params = {
			api_key: '2043203153'
		};

		bfet.get("https://api.pbapp.net/Player/jontestuser", params)
			.then((result) => {
				// ensure that result is object
				expect(typeof result.response == "object").toBeTruthy();
				expect(result.response.success).not.toBe(null);
				expect(result.response.success).toBeTruthy();
				done();
			}, (e) => {
				fail(e);
			});
	});

	it("should form get url param properly and get success result back from API - string", function(done) {

		var params = {
			api_key: '2043203153'
		};

		bfet.get("https://api.pbapp.net/Player/jontestuser", params, { json_parse: false })
			.then((result) => {
				// ensure that result is string
				expect(typeof result.response == "string").toBeTruthy();
				expect(result.response.success == undefined || result.success == null).toBeTruthy();
				expect(result.response.search("Success") != -1).toBeTruthy();
				done();
			}, (e) => {
				fail(e);
			});
	});

	// only test this test case on nodejs
	// as target website doesn't support CORS
	if (!isBrowser()) {
		it("should get HTML content back", function(done) {
			bfet.get("https://www.baidu.com", null, { json_parse: false })
			.then((result) => {
				expect(typeof result.response == "string").toBeTruthy();
				expect(result.response != null && result != "").toBeTruthy();
				done();
			}, (e) => {
				fail(e);
			});
		});

		it("should be able to support 301 (moved permanently)", function(done) {
		// baidu.com has returned 301
		// it's ok as it might not return within the limit timeout
		bfet.get("https://baidu.com", null, { json_parse: false })
			.then((result) => {
				done();
			}, (e) => {
				fail(e);
			});
		});

		it("should be able to support 302 (redirect URL)", function(done) {
			// playbasis.com has returned 302
			bfet.get("https://playbasis.com", null, { json_parse: false} )
				.then((result) => {
					done();
				}, (e) => {
					fail(e);
				});
		});
	}
});
