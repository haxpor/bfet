'use strict';

/**
 * bfet Util
 * @namespace bfet.util
 */
module.exports = function(bfet) {
  var util = bfet.util = {};

  /**
   * Check if object and property exist, then get property value from specified object. If such property value is null, then return default value instead.
   * @param  {Object} object       Object to get property value from
   * @param  {String} propertyName Property name to get value from
   * @param {Any} defaultValue Default value to return if resolved property value is null. It can be any type.
   * @return {Any}              Value of specified property from object. It can be any type.
   * @method propertyCheck
   * @memberOf bfet.util
   */
  util.propChk = function(object, propertyName, defaultValue) {
    if (object != null && propertyName != null && object.hasOwnProperty(propertyName)) {
      if (object[propertyName] == null || object[propertyName] == undefined) {
        return defaultValue;
      }
      else {
        return object[propertyName];
      }
    }
    else {
        return defaultValue;
    }
  }

  /**
   * Form GET Url params
   * @param  {Object} paramsObj Parameters in object-based. Property name is key, and value is its value.
   * @param {Boolean} opt_qmark **optional** Whether or not to include '?' in forming url param string. Set to true to include it, otherwise set to false. Default is always include.
   * @return {String}           GET Url param
   * @method  getUrlParamStr
   * @memberOf bfet.util
   */
  util.getUrlParamStr = function(paramsObj, opt_qmark) {
    if (paramsObj == null || paramsObj == undefined)
      return "";

    var param_str = (opt_qmark == undefined || opt_qmark) ? "?" : "" ;
    var i = 0;

    // iterate through the param obj
    for (var prop in paramsObj) {
      if (paramsObj.hasOwnProperty(prop) && paramsObj[prop] != null) {

        if (i != 0) {
          param_str += "&";
        }

        param_str += encodeURIComponent(prop) + "=" + encodeURIComponent(paramsObj[prop]);

        i++;
      }
    }

    return param_str;
  }
}
