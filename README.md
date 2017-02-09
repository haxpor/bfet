# bfet
A thin minimal wrapped around http|https NodeJS module for NodeJS and browser.

# Features

bfet supports sending `GET` and `POST` request method for both HTTP and HTTPS with an option to parse response as JSON or just simple string. Support Promise as return.

# Install

Install it via `npm install bget`

# Usage

## GET Request

`bfet.get("https://targetdomain.com")`

`bfet.get("https://targetdomain.com?myanswer=1")`

`bfet.get("https://targetdomain.com", { myanswer: 1 })`

`bfet.get("https://targetdomain.com", { myanswer: 1 }, { json_parse: false })`

## POST Request

`bfet.post("https://targetdomain.com", { myanswer: 1 })`

`bfet.post("https://targetdomain.com", { myanswer: 1 }, { json_parse: false })`

# Development

- `npm run build` - to create a bundle files in `./dist` directory
- `npm test` - to run tests for both NodeJS and browser
- `npm run http-and-watch` - to build, start local http-server and watch changes on file for live reloading

# Misc
This project is based on [https://github.com/haxpor/basejit](https://github.com/haxpor/basejit)

# License

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)  
This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://github.com/haxpor/bfet/blob/master/LICENSE)