var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
if (!isBrowser()) {
	bfet = require('../src/bfet');
}

describe("post request", function() {
	it("should get object as result", function(done) {

		var postData = {
			api_key: '2043203153',
			api_secret: '144da4c8df85b94dcdf1f228ced27a32'
		};

		bfet.post("https://api.pbapp.net/Auth", postData)
			.then((result) => {
				// ensure that result is object
				expect(typeof result == "object").toBeTruthy();
				expect(result.success).not.toBe(null);
				expect(result.response).not.toBe(null);
				expect(result.response.token).not.toBe(null);
				done();
			}, (e) => {
				fail(e);
			});
	});

	it("should get string as result", function(done) {

		var postData = {
			api_key: '2043203153',
			api_secret: '144da4c8df85b94dcdf1f228ced27a32'
		};

		bfet.post("https://api.pbapp.net/Auth", postData, { json_parse: false })
			.then((result) => {
				// ensure that result is not object
				expect(typeof result == "string").toBeTruthy();
				expect(result.success == undefined || result.success == null).toBeTruthy();
				expect(result.response == undefined || result.response == null).toBeTruthy();
				expect(result.search('token') != -1).toBeTruthy();
				done();
			}, (e) => {
				fail(e);
			});
	});

	it("should get error from API's response", function(done) {
		bfet.post("https://api.pbapp.net/Auth")
			.then((result) => {
				// ensure that result is not object
				expect(typeof result == "object").toBeTruthy();
				expect(result.success == false).toBeTruthy();
				expect(result.error_code == "0903").toBeTruthy();
				done();
			}, (e) => {
				fail(e);
			});
	});
 });
