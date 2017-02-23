# bfet
A thin minimal wrapped around http|https NodeJS module for NodeJS and Browser.

# Features

bfet supports sending `GET` and `POST` request method for both HTTP and HTTPS with an option to parse response as JSON or just simple string. Support Promise as return.

Only target url that supports [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) will work on browser, otherwise it will return error accordingly. There should be no problem on NodeJS.

# Install

Install it via `npm install bfet`

# Usage

## Promise Ready

```javascript
bfet.get("https://targetdomain.com")
		.then((result) => {
			// do something with result here...
		}, (e) => {
			// error here, you can inspect its code and message
			// via e.code and e.message
		});
```

## GET Request

`bfet.get("https://targetdomain.com")`

`bfet.get("https://targetdomain.com?myanswer=1")`

`bfet.get("https://targetdomain.com", { myanswer: 1 })`

`bfet.get("https://targetdomain.com", { myanswer: 1 }, { json_parse: false })`

`bfet.get("https://targetdomain.com", { myanswer: 1 }, { username: "myusername", password: "mypassword" })`

## POST Request

`bfet.post("https://targetdomain.com", { myanswer: 1 })`

`bfet.post("https://targetdomain.com", { myanswer: 1 }, { json_parse: false })`

`bfet.post("https://targetdomain.com", { myanswer: 1 }, { username: "myusername", password: "mypassword" })`

## Options

You have following options to set for your request.

* `json_parse` - `Boolean` - Default is `true`, you can set to `false` to not parse the result you get.
* `username` - `String` - If target URL needs basic authorization, you can set username here.
* `password` - `String` - If target URl needs basic authorization, you can set password here.

# Development

- `npm run build` - to create a bundle files in `./dist` directory
- `npm test` - to run tests for both NodeJS and browser
- `npm run http-and-watch` - to build, start local http-server and watch changes on file for live reloading

# Misc
This project is based on [https://github.com/haxpor/basejit](https://github.com/haxpor/basejit)

# License

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)  
This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://github.com/haxpor/bfet/blob/master/LICENSE)
