/**
 * @namespace bfet
 */

// -- bfet -- //
var bfet = require('./core/_core.js')();

require('./core/core.util.js')(bfet);
require('./cache/cache.js')(bfet);
require('./core/core.js')(bfet);	// core should be defined last as it needs other modules to function

module.exports = bfet;
// if it's in browser environment
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
if (isBrowser()) {
    window.bfet = bfet;
}
