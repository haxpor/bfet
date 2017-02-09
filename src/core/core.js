'use strict';

module.exports = function(bfet) {

    bfet.errorCode = {
    	responseIsNull: 99999,
    	jsonParsedError: 99998,
    	responseError: 99997,
    	requestError: 99996,
    	internetConnectionIssue: 99995
    };

    // check if the error is about internet connection or not, also can be CORS problem
		function _isRelateToInternetConnectionIssue(errorMsg) {
			// as tested on Safari, Chrome, and Firefox we got 2 possible messages to check
			if (errorMsg.search("XHR error") > -1 || errorMsg.search("Failed to fetch") > -1) {
				return true;
			}
			else {
				return false;
			}
		}

		/**
		 * Send GET request
		 * @param  {String} url           Target URL
		 * @param  {Object} opt_paramsObj **optional** Optional params as object. Each property is key, and each property's value is its value. This will be formed as a url param string.
		 * @param  {Object} opts          **optional** Options as object.  
		 * It can include  
		 * {  
		 * `json_parse`: *Boolean* = Whether or not for result to be parsed via JSON parser. Set this to true to force it to parse result as json. Default is true.  
		 * }
		 * @return {Object}               Promise object
		 * @method get
		 * @memberOf bfet
		 */
    bfet.get = function(url, opt_paramsObj, opts) {
    	var param_str = "";

    	if (opt_paramsObj != null) {
	    	// find '?'
	    	// to know whether we should include '?' again in url param or not
	    	if (url.search('\\?') != -1) {
	    		// get url param string (without '?')
	    		param_str = bfet.util.getUrlParamStr(opt_paramsObj, false);
	    	}
	    	else {
	    		// get url param string (with '?')
	    		param_str = bfet.util.getUrlParamStr(opt_paramsObj);
	    	}
	    }

	    // get final url
	    var furl = url + param_str;

    	return new Promise( (resolve, reject) => {
    		const lib = furl.search('https') != -1 ? require('https') : require('http');

    		// collect all data chunks into array
			var dataChunks = [];

			// make a GET request
			const request = lib.get(furl, (response) => {
				// handle http errors
				if (response.statusCode != 200) {
					var error = new Error(response.statusCode)
					error.code = response.statusCode;
					return reject(error);
				}

				// listen to event 'data' for each indivdiual chunk of data
				response.on('data', (chunk) => {
					dataChunks.push(chunk);
				});

				// listen to event 'end' when all chunks of data are transmitted
				response.on('end', () => {

					// combine all data chunks together
					let d = dataChunks.join('');

					// check if data is null
					if (d == null) {
						var error = new Error("Response is null");
						error.code = bfet.errorCode.responseIsNull;
						return reject();
					}

					let rd = null;
					var json_parse = bfet.util.propChk(opts, "json_parse", true);

					if (json_parse) {
						try {
							// parse data resposne to json
							rd = JSON.parse(d);
						}
						catch(e) {
							var error = new Error("Error parsing JSON response message [" + e.message + "]");
							error.code = bfet.errorCode.jsonParsedError;
							return reject(error);
						}
					}
					else {
						// just get the data back
						rd = d;
					}

					// all ok
					// note: we didn't check for api-level error here, user
					// need to manually check on their side
					return resolve(rd);
				});

				// listen to event 'error'
				response.on('error', (e) => {
					var error = new Error("Response error [" + e.message + "]");
					error.code = bfet.errorCode.responseError;
					return reject(error); 
				});
			});

			request.on('error', (e) => {
				// if it relates to internet connection issue, then mark its code
				if (_isRelateToInternetConnectionIssue(e.message)) {
					var error = new Error("Request error [" + e.message + "]");
					error.code = bfet.errorCode.internetConnectionIssue;
					return reject(error);
				}
				else {
					var error = new Error("Internet connection issue. It might be about unable to connect to WiFi [" + e.message + "]");
					error.code = bfet.errorCode.internetConnectionIssue;
					return reject(error);
				}
			});
    	});
    }

    bfet.post = function(url, paramsObj) {

    }
};
