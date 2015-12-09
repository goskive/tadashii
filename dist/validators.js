"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * Named validators. All validators gets the value, attribute, full model and any additional
 * passed in the schema.
 *
 * function validator(value, attribute, model, ...additional_arguments) {}
 */

var EMAIL_REGEXP = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i; // eslint-disable-line max-len

var minLength = exports.minLength = function minLength(value, attribute, model, minimum) {
  return value && value.length >= minimum;
};

var maxLength = exports.maxLength = function maxLength(value, attribute, model, maximum) {
  return value && value.length <= maximum;
};

var isRequired = exports.isRequired = function isRequired(value) {
  return typeof value === "string" ? value.length > 0 : true && typeof value !== "undefined" && value !== null;
};

var matchesAttribute = exports.matchesAttribute = function matchesAttribute(value, attribute, model, other_attribute) {
  return model[attribute] === model[other_attribute];
};

var matchesRegexp = exports.matchesRegexp = function matchesRegexp(value, attribute, model, regexp) {
  return regexp.test(value);
};

var isEmail = exports.isEmail = function isEmail(value, attribute, model) {
  return matchesRegexp(value, attribute, model, EMAIL_REGEXP);
};

var isIncluded = exports.isIncluded = function isIncluded(value, attribute, model, list) {
  return list.indexOf(value) > -1;
};