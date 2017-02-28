'use strict';

/**
 * bfet caching system
 * @namespace bfet.cache
 */
module.exports = function(bfet) {
  var cache = bfet.cache = {};

  // cache dictionary
  // key => target url (String)
  // value => { response: {}, etag: "" } (Object)
  var cacheDict = {};

 	/**
 	 * Clear all cache.
 	 * @method clear
 	 * @memberOf bfet.cache
 	 */
  cache.clear = function() {
  	// delete property from cacheDict
  	for (var prop in cacheDict) {
  		delete cacheDict[prop];
  	}
  }

  /**
   * Set a new url with response and either etag, or last-modified.
   * At least etag, or last-modified need to be present to make this caching item effective.
   * @param {String} url      Target URL that is requested. Use this as a key.
   * @param {Object | String} response Response in Object or String as returned from response.
   * @param {Object} responseHeaders Response headers for this reponse
   * @param {String} etag     ETag as returned from response.
   * @param {String} lastModified Last modified string which can be got from 'Last-Modified' header from response
   * @method set
   * @memberOf bfet.cache
   */
  cache.set = function(url, response, responseHeaders, etag, lastModified) {
  	cacheDict[url] = { response: response, responseHeaders: responseHeaders, etag: etag, last_modified: lastModified };
  }

  /**
   * Get a cached item from specified url.
   * @param  {String} url URL to get cached item
   * @return {Object}     Cached item
   * @method  get
   * @memberOf bfet.cache
   */
  cache.get = function(url) {
  	return cacheDict[url];
  }
}
