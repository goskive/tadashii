"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;
exports.isValid = isValid;
exports.firstError = firstError;

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function extractFunctionAndArguments(modelValue, attribute, model, options) {
  var isCustom = typeof options[0] === "function";
  var func = isCustom ? options[0] : validators[options[0]];
  /*
   * [validatorFunction, argumentsToValidator, errorMessage]
   */
  var args = options.slice(1, -1);
  var validatorArguments = [modelValue, attribute, model].concat(_toConsumableArray(args));

  return [func, validatorArguments];
}

/*
 * Map over each validator and return error messages for those that fail.
 */
function validate(schema, model) {
  return Object.keys(schema).reduce(function (result, attribute) {
    var validations = schema[attribute];
    var modelValue = model[attribute];

    result[attribute] = validations.filter(function (options) {
      var _extractFunctionAndAr = extractFunctionAndArguments(modelValue, attribute, model, options);

      var _extractFunctionAndAr2 = _slicedToArray(_extractFunctionAndAr, 2);

      var func = _extractFunctionAndAr2[0];
      var validatorArguments = _extractFunctionAndAr2[1];

      return func.apply(undefined, _toConsumableArray(validatorArguments)) === false;
    }).map(function (options) {
      var errorMessage = options[options.length - 1];

      return typeof errorMessage === "function" ? errorMessage(modelValue) : errorMessage;
    });

    return result;
  }, {});
}

/*
 * Determine whether a model is valid according to its schema
 */
function isValid(schema, model) {
  return !Object.keys(schema).find(function (attribute) {
    var validations = schema[attribute];
    var modelValue = model[attribute];

    return !!validations.find(function (options) {
      var _extractFunctionAndAr3 = extractFunctionAndArguments(modelValue, attribute, model, options);

      var _extractFunctionAndAr4 = _slicedToArray(_extractFunctionAndAr3, 2);

      var func = _extractFunctionAndAr4[0];
      var validatorArguments = _extractFunctionAndAr4[1];

      return func.apply(undefined, _toConsumableArray(validatorArguments)) === false;
    });
  });
}

/*
 * Return first error for model, or null if there is no error
 */
function firstError(schema, model) {
  var firstFailedValidation = Object.keys(schema).reduce(function (result, attribute) {
    return result.concat(schema[attribute].map(function (v) {
      return [attribute, v];
    }));
  }, []).find(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var attribute = _ref2[0];
    var validation = _ref2[1];

    var modelValue = model[attribute];

    var _extractFunctionAndAr5 = extractFunctionAndArguments(modelValue, attribute, model, validation);

    var _extractFunctionAndAr6 = _slicedToArray(_extractFunctionAndAr5, 2);

    var func = _extractFunctionAndAr6[0];
    var validatorArguments = _extractFunctionAndAr6[1];

    return func.apply(undefined, _toConsumableArray(validatorArguments)) === false;
  });

  if (firstFailedValidation) {
    var _firstFailedValidatio = _slicedToArray(firstFailedValidation, 2);

    var attribute = _firstFailedValidatio[0];
    var validation = _firstFailedValidatio[1];

    return [attribute, validation[validation.length - 1]];
  } else {
    return null;
  }
}