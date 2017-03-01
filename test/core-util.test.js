describe("core's util", function() {
	beforeAll(function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
	});
	
	it("should get same value", function() {

		var opts = {
			prop1: "prop1-value",
			prop2: "prop2-value"
		};

		expect(bfet.util.propChk(opts, "prop1", "wrong-value")).toEqual("prop1-value");
	});

	it("should get default value", function() {

		var opts = {
			prop1: "prop1-value",
			prop1: "prop2-value"
		};

		expect(bfet.util.propChk(opts, "prop3", "default-value")).toEqual("default-value");
	});

	it("should get proper URL param", function() {

		var params = {
			prop1: "prop1-value",
			prop2: "prop2-value"
		};

		expect(bfet.util.getUrlParamStr(params)).toEqual("?prop1=prop1-value&prop2=prop2-value");
		expect(bfet.util.getUrlParamStr(params, true)).toEqual("?prop1=prop1-value&prop2=prop2-value");
		expect(bfet.util.getUrlParamStr(params, false)).toEqual("prop1=prop1-value&prop2=prop2-value");
	});
});
