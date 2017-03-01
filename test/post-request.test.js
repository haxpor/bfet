var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
if (!isBrowser()) {
	bfet = require('../src/bfet');
}

describe("post request", function() {
	beforeAll(function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
	});
	
	it("should get object as result", function(done) {

		var postData = {
			api_key: '2043203153',
			api_secret: '144da4c8df85b94dcdf1f228ced27a32'
		};

		bfet.post("https://api.pbapp.net/Auth", postData)
			.then((result) => {
				// ensure that result is object
				// note: response is actual property of object returned from POST request, so don't get confused!
				expect(typeof result.response == "object").toBeTruthy();
				expect(result.response.success).not.toBe(null);
				expect(result.response.response).not.toBe(null);
				expect(result.response.response.token).not.toBe(null);
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
				expect(typeof result.response == "string").toBeTruthy();
				expect(result.response.success == undefined || result.success == null).toBeTruthy();
				expect(result.response.response == undefined || result.response == null).toBeTruthy();
				expect(result.response.search('token') != -1).toBeTruthy();
				done();
			}, (e) => {
				fail(e);
			});
	});

	it("should get error from API's response", function(done) {
		bfet.post("https://api.pbapp.net/Auth")
			.then((result) => {
				// ensure that result is not object
				expect(typeof result.response == "object").toBeTruthy();
				expect(result.response.success == false).toBeTruthy();
				expect(result.response.error_code == "0903").toBeTruthy();
				done();
			}, (e) => {
				fail(e);
			});
	});
 });
