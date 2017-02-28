# bfet
A thin minimal wrapped around http|https NodeJS module for NodeJS and Browser.

# Features

bfet supports sending `GET` and `POST` request method for both HTTP and HTTPS with an option to parse response as JSON or just simple string. Support Promise as return. It has internal caching system for GET request and you can enable or disable it.

Only target url that supports [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) will work on browser, otherwise it will return error accordingly. There should be no problem on NodeJS.

# Install

Install it via `npm install bfet`

# Usage

## Promise Ready

```javascript
bfet.get("https://targetdomain.com")
		.then((result) => {
			// actual result data: result.response
			// response's HTTP headers: result.responseHeaders
		}, (e) => {
			// error code and message: e.code and e.message
			// response's HTTP headers: e.responseHeaders
		});
```

## GET Request

`bfet.get("https://targetdomain.com")`

`bfet.get("https://targetdomain.com?myanswer=1")`

`bfet.get("https://targetdomain.com", { myanswer: 1 })`

`bfet.get("https://targetdomain.com", { myanswer: 1 }, { json_parse: false })`

`bfet.get("https://targetdomain.com", { myanswer: 1 }, { username: "myusername", password: "mypassword" })`

```javascript
bfet.get("https://targetdomain.com", 
	{ myanswer: 1 }, 
	{ 
		username: "myusername", 
		password: "mypassword", 
		headers: {
			'If-None-Match': '"d751713988987e9331980363e24189ce"'
		}
	})
```

## POST Request

`bfet.post("https://targetdomain.com", { myanswer: 1 })`

`bfet.post("https://targetdomain.com", { myanswer: 1 }, { json_parse: false })`

`bfet.post("https://targetdomain.com", { myanswer: 1 }, { username: "myusername", password: "mypassword" })`

## Caching

By default, it's enabled with internal caching for GET request.  
It makes much more sense to cache only GET request as almost for POST request, it's just an acknowledge short response that user has successfully updated or created new resource. GET request is more likely to be dynamically changed, and larger in size.

bfet allows user to manually handle caching without relying on internal system although this would achieve the same result.

### Manual Cache Handling

See the following code

```javascript

	bfet.global.options.enableCaching = false;

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

			// 2nd request
			bfet.get(url, null, { 
				headers: {
					'If-None-Match': etag
				}
			}).then((r2) => {
					// if cache hit, this line should not be reached
				}, (e2) => {
					// e2.code = 304 indicates that resource is not modified
					// feel free to grab local resource and use it via cachedItem as we saved eariler
				});

		}, (e1) => {
			// handle error for first request
		});
```

Concept is as follows

1. User disable caching via `bfet.global.options.enableCaching`
2. Make a first request
3. Save etag, or last-modified from response's headers, and also save response data
4. Make a second request with additional header of either `If-None-Match` or `If-Modified-Since`.
5. If cache hit, user should receive error result with code `304`.
6. Otherwise, observe error code for other circumstances.

## Options

### Individual Options

You have following options to set for your request.

* `json_parse` - `Boolean` - Default is `true`, you can set to `false` to not parse the result you get.
* `username` - `String` - If target URL needs basic authorization, you can set username here.
* `password` - `String` - If target URl needs basic authorization, you can set password here.
* `headers` - `Object` - Headers as object for additional headers to be sent along with the request.

### Global Options

bfet has global options which if configured will affect the whole system

* `bfet.global.options.enableCaching` - enable/disable internal caching, pretty much relates to HTTP 304 status code

# Development

- `npm run build` - to create a bundle files in `./dist` directory
- `npm test` - to run tests for both NodeJS and browser
- `npm run http-and-watch` - to build, start local http-server and watch changes on file for live reloading

# Misc
This project is based on [basejit](https://github.com/haxpor/basejit)

# License

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)  
This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://github.com/haxpor/bfet/blob/master/LICENSE)
