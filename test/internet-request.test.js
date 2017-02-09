var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
if (!isBrowser()) {
	bfet = require('../src/bfet');
}

describe("internet request", function() {
	it("should get object as result", function(done) {
		bfet.get("https://api.pbapp.net/Player/jontestuser?api_key=2043203153")
			.then((result) => {
				// ensure that result is object
				expect(typeof result == "object").toBeTruthy();
				expect(result.success).not.toBe(null);
				done();
			}, (e) => {
				fail(e);
			});
	});

	it("should get string as result", function(done) {
		bfet.get("https://api.pbapp.net/Player/jontestuser?api_key=2043203153", null, { json_parse: false })
			.then((result) => {
				// ensure that result is object
				expect(typeof result == "string").toBeTruthy();
				expect(result.success == undefined || result.success == null).toBeTruthy();
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
				expect(typeof result == "object").toBeTruthy();
				expect(result.success).not.toBe(null);
				expect(result.success).toBeTruthy();
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
				expect(typeof result == "string").toBeTruthy();
				expect(result.success == undefined || result.success == null).toBeTruthy();
				expect(result.search("Success") != -1).toBeTruthy();
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
				expect(typeof result == "string").toBeTruthy();
				expect(result.search('百度一下，你就知道') != -1).toBeTruthy();	// this is very less likely to be changed
				done();
			}, (e) => {
				fail(e);
			});
		});
	}
});
