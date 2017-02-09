/**
 * @namespace bfet
 */

// -- bfet -- //
var bfet = require('./core/core.js')();

require('./core/core.util.js')(bfet);

module.exports = bfet;
// if it's in browser environment
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
if (isBrowser()) {
    window.bfet = bfet;
}
